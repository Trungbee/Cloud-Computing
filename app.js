const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = 3000;

// Middleware để xử lý các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Thiết lập EJS làm view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'Views'));

// Đọc dữ liệu từ file JSON
const dataPath = path.join(__dirname, 'data', 'Car.json');

const getCars = () => {
    const jsonData = fs.readFileSync(dataPath);
    return JSON.parse(jsonData);
};

// Trang danh sách ô tô
app.get('/', (req, res) => {
    const cars = getCars();
    res.render('index', { cars });
});

// Trang chi tiết ô tô
app.get('/car/:id', (req, res) => {
    const cars = getCars();
    const car = cars.find(c => c.id === parseInt(req.params.id));
    if (!car) {
        return res.status(404).send('Car not found');
    }
    res.render('detail', { car });
});

// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
