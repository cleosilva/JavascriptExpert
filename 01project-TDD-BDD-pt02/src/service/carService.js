const BaseRepository = require('./../repository/base/baseRepository');
class CarService {
    constructor({ cars }) {
        this.carRepository = new BaseRepository({ file: cars })
    }

    getRandomPositionFromArray(list) {
        const listLength = list.length
        return Math.floor(Math.random() * (listLength))

    }
    chooseRandomCar(carCategory) {
        const randomCarIndex = this.getRandomPositionFromArray(carCategory.carIds);
        console.log('randomCarIndex', randomCarIndex)
        const carId = carCategory.carIds[randomCarIndex];

        console.log('carId chooseRandom', carId)
        return carId;
    }
    async getAvailableCar(carCategory) {
        const carId = this.chooseRandomCar(carCategory);
        console.log('CarID getAvailable', carId)
        const car = await this.carRepository.find(carId)
        console.log('car getAvailable', car)
        return car;
    }

}
module.exports = CarService;