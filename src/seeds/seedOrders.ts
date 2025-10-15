import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/db';
import { Order } from '../models/order.model';
import { logger } from '../utils/logger';

dotenv.config();

const sampleOrders = [
    {
        user: {
            firstName: "Mohammed",
            middleName: "Ahmed",
            lastName: "Al-Rashid",
            email: "mohammed.rashid@example.com",
            passportNumber: "P12345678",
            nationality: "United Arab Emirates",
            visaType: "Tourist",
            visaNumber: "SA-2025-001234",
            issueDate: "2025-01-15",
            expiryDate: "2025-04-15"
        },
        package: {
            packageName: "Premium 30 Days",
            sms: "Unlimited",
            data: "50GB",
            min: "500 Minutes",
            price: 299,
            validity: "30 Days"
        },
        sim: {
            simType: "esim",
            number: "+966501234567"
        }
    },
    {
        user: {
            firstName: "Fatima",
            lastName: "Khan",
            email: "fatima.khan@example.com",
            passportNumber: "K87654321",
            nationality: "Pakistan",
            visaType: "Business",
            visaNumber: "SA-2025-005678",
            issueDate: "2025-02-20",
            expiryDate: "2025-05-20"
        },
        package: {
            packageName: "Standard 15 Days",
            sms: "200 SMS",
            data: "20GB",
            min: "300 Minutes",
            price: 149,
            validity: "15 Days"
        },
        sim: {
            simType: "psim",
            number: "+966509876543"
        }
    },
    {
        user: {
            firstName: "John",
            middleName: "David",
            lastName: "Smith",
            email: "john.smith@example.com",
            passportNumber: "US98765432",
            nationality: "United States",
            visaType: "Tourist",
            visaNumber: "SA-2025-009876",
            issueDate: "2025-03-10",
            expiryDate: "2025-06-10"
        },
        package: {
            packageName: "Basic 7 Days",
            sms: "100 SMS",
            data: "10GB",
            min: "150 Minutes",
            price: 79,
            validity: "7 Days"
        },
        sim: {
            simType: "esim",
            number: "+966502468135"
        }
    },
    {
        user: {
            firstName: "Yuki",
            lastName: "Tanaka",
            email: "yuki.tanaka@example.com",
            passportNumber: "JP11223344",
            nationality: "Japan",
            visaType: "Work",
            visaNumber: "SA-2025-012345",
            issueDate: "2025-01-05",
            expiryDate: "2026-01-05"
        },
        package: {
            packageName: "Ultra 90 Days",
            sms: "Unlimited",
            data: "150GB",
            min: "Unlimited",
            price: 699,
            validity: "90 Days"
        },
        sim: {
            simType: "esim",
            number: "+966503692581"
        }
    },
    {
        user: {
            firstName: "Maria",
            middleName: "Isabel",
            lastName: "Garcia",
            email: "maria.garcia@example.com",
            passportNumber: "ES55667788",
            nationality: "Spain",
            visaType: "Hajj",
            visaNumber: "SA-2025-067890",
            issueDate: "2025-05-01",
            expiryDate: "2025-06-01"
        },
        package: {
            packageName: "Hajj Special 30 Days",
            sms: "Unlimited",
            data: "30GB",
            min: "Unlimited",
            price: 199,
            validity: "30 Days"
        },
        sim: {
            simType: "psim",
            number: "+966507531590"
        }
    }
];

const seedOrders = async () => {
    try {
        // Connect to database
        await connectDB();
        
        // Clear existing orders
        logger.info('Clearing existing orders...');
        await Order.deleteMany({});
        logger.info('Existing orders cleared.');

        // Insert sample orders
        logger.info('Inserting sample orders...');
        const inserted = await Order.insertMany(sampleOrders);
        logger.info(`Successfully inserted ${inserted.length} sample orders!`);

        // Display the visa numbers for testing
        logger.info('\n========================================');
        logger.info('Sample Visa Numbers for Testing:');
        logger.info('========================================');
        sampleOrders.forEach((order, index) => {
            logger.info(`${index + 1}. ${order.user.firstName} ${order.user.lastName}`);
            logger.info(`   Visa Number: ${order.user.visaNumber}`);
            logger.info(`   Package: ${order.package.packageName}`);
            logger.info(`   SIM Type: ${order.sim.simType.toUpperCase()}`);
            logger.info('----------------------------------------');
        });

        // Disconnect from database
        await disconnectDB();
        process.exit(0);
    } catch (error) {
        logger.error({ err: error }, 'Error seeding database');
        process.exit(1);
    }
};

// Run the seed function
seedOrders();
