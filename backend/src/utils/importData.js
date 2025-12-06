const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { getDB } = require('../config/database.mongoose');

async function importCSVToMongoDB() {
    const BATCH_SIZE = 10000; // Insert in batches of 10,000 records
    let batch = [];
    let totalRecords = 0;
    const csvPath = path.join(__dirname, '../../data/truestate_assignment_dataset.csv');

    return new Promise((resolve, reject) => {
        const db = getDB();
        const collection = db.collection('sales');
        
        // Clear existing data before starting
        collection.deleteMany({}).then(() => {
            console.log('Cleared existing data, starting import...');
            
            const stream = fs.createReadStream(csvPath)
                .pipe(csv())
                .on('data', async (data) => {
                    // Transform data
                    if (data.Tags) {
                        data.Tags = data.Tags.split(',').map(t => t.trim());
                    } else {
                        data.Tags = [];
                    }

                    // Convert numeric fields
                    data.Age = Number(data.Age);
                    data.Quantity = Number(data.Quantity);
                    data['Price per Unit'] = Number(data['Price per Unit']);
                    data['Total Amount'] = Number(data['Total Amount']);
                    data['Final Amount'] = Number(data['Final Amount']);
                    data['Discount Percentage'] = Number(data['Discount Percentage']);

                    batch.push(data);
                    
                    // When batch is full, pause stream and insert
                    if (batch.length >= BATCH_SIZE) {
                        stream.pause();
                        
                        try {
                            await collection.insertMany(batch);
                            totalRecords += batch.length;
                            console.log(`Imported ${totalRecords} records...`);
                            batch = [];
                            stream.resume();
                        } catch (error) {
                            stream.destroy();
                            reject(error);
                        }
                    }
                })
                .on('end', async () => {
                    try {
                        // Insert remaining records in the last batch
                        if (batch.length > 0) {
                            await collection.insertMany(batch);
                            totalRecords += batch.length;
                        }
                        
                        console.log(`✓ Successfully imported ${totalRecords} records to MongoDB`);
                        resolve(totalRecords);
                    } catch (error) {
                        console.error('Error during final MongoDB import:', error);
                        reject(error);
                    }
                })
                .on('error', (err) => {
                    reject(err);
                });
        }).catch(reject);
    });
}

module.exports = { importCSVToMongoDB };
