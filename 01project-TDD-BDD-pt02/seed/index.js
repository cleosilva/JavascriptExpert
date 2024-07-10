const { faker } = require('@faker-js/faker');
const Car = require('../src/entities/car');
const Customer = require('../src/entities/customer');
const CarCategory = require('../src/entities/carCategory');

const { join } = require('path');
const { writeFile } = require('fs/promises');

const seederBaseFolder = join(__dirname, '../', 'database');
const ITEMS_AMOUT = 2;

const carCategory = new CarCategory({
    id: faker.string.uuid(),
    name: faker.vehicle.type(),
    carIds: [],
    price: faker.finance.amount({ min: 20, max: 100 })
});

const cars = [];
const customers = [];
for (let index = 0; index <= ITEMS_AMOUT; index++) {
    const car = new Car({
        id: faker.string.uuid(),
        name: faker.vehicle.model(),
        available: true,
        gasAvailable: true,
        releaseYear: faker.date.past().getFullYear()
    });
    carCategory.carIds.push(car.id);
    cars.push(car)

    const customer = new Customer({
        id: faker.string.uuid(),
        name: faker.person.firstName(),
        age: faker.finance.amount({ min: 18, max: 50, dec: 0 })
    });
    customers.push(customer);
}

const write = (filename, data) => writeFile(join(seederBaseFolder, filename), JSON.stringify(data));

; (async () => {
    await write('cars.json', cars);
    await write('carCategories.json', carCategory);
    await write('customers.json', customers);


    console.log('cars', cars);
    console.log('carCategories', carCategory);
    console.log('customers', customers);


})()
