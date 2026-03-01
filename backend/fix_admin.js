const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function fixAdmin() {
    try {
        await mongoose.connect('mongodb+srv://elqarniasamah:elqarniasamah@cluster0.p2g75f7.mongodb.net/?appName=Cluster0');
        console.log('Connected to MongoDB');

        const db = mongoose.connection.db;
        const usersCollection = db.collection('users');

        const email = 'admin@admin.com';
        const rawPassword = 'adminpassword123';
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(rawPassword, salt);

        // Try to find the user first
        const existingUser = await usersCollection.findOne({ email: email });

        if (existingUser) {
            console.log('User exists, updating role and password...');
            await usersCollection.updateOne(
                { email: email },
                {
                    $set: {
                        role: 'Admin',
                        password: hashedPassword,
                        isDeleted: false
                    }
                }
            );
        } else {
            console.log('User does not exist, creating new Admin user...');
            let cart = {};
            for (let i = 0; i < 300; i++) {
                cart[i] = 0;
            }
            await usersCollection.insertOne({
                name: 'Admin User',
                email: email,
                password: hashedPassword,
                role: 'Admin',
                cartData: cart,
                isDeleted: false,
                createdAt: new Date(),
                updatedAt: new Date()
            });
        }

        console.log('Admin account (admin@admin.com) is now ready with password: adminpassword123');
        process.exit(0);
    } catch (error) {
        console.error('Error fixing admin:', error);
        process.exit(1);
    }
}

fixAdmin();
