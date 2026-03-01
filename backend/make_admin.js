const mongoose = require('mongoose');

async function makeAdmin() {
    await mongoose.connect('mongodb+srv://elqarniasamah:elqarniasamah@cluster0.p2g75f7.mongodb.net/?appName=Cluster0');
    const db = mongoose.connection.db;
    await db.collection('users').updateOne(
        { email: 'admin@admin.com' },
        { $set: { role: 'Admin' } }
    );
    console.log('Updated admin@admin.com user role to Admin');
    process.exit(0);
}

makeAdmin();
