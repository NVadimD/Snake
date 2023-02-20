const canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

const ground = new Image();
ground.src = 'img/bg-canvas.png';

const foodImg = new Image();
foodImg.src = 'img/food.png';

const box = 32;   // Размер клетки на поле в пикселях

let score = 0;

let food = {
    x: Math.floor(Math.random() * 17 + 1) * box,
    y: Math.floor(Math.random() * 15 + 3) * box
}

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
}


document.addEventListener('keydown', direction);
let dir;
function direction(event){
    if (event.key === 'ArrowUp' && dir !== 'down'){
        dir = 'up';
    } else if (event.key === 'ArrowLeft' && dir !== 'right'){
        dir = 'left';
    } else if (event.key === 'ArrowDown' && dir !== 'up'){
        dir = 'down';
    } else if (event.key === 'ArrowRight' && dir !== 'left'){
        dir = 'right';
    }
}

function eatTail(head, arrSnake){
    for (let i = 0; i < arrSnake.length; i++){
        if (head.x == arrSnake[i].x && head.y == arrSnake[i].y){
            clearInterval(game);
        }
    }
}

function drawGame() {
    ctx.drawImage(ground, 0, 0);                       // Рисуем поле

    ctx.drawImage(foodImg, food.x, food.y);            // Рисуем еду (в случайной точке)
    
    for (let i = 0; i < snake.length; i++){            // Рисуем змею (в центральной точке голова всегда)
        ctx.fillStyle = i == 0 ? "green" : "yellow";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.fillStyle = 'white';
    ctx.font = '50px Arial';
    ctx.fillText(score, box*2.5, box*1.7);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;
    if (snakeX === food.x && snakeY === food.y){
        score++;
        food = {
            x: Math.floor(Math.random() * 17 + 1) * box,
            y: Math.floor(Math.random() * 15 + 3) * box
        }
    } else {
        snake.pop();
    }

    if (snakeX < box || snakeX > box * 17 || snakeY < box * 3 || snakeY > box * 17){
        clearInterval(game);
    }

    if (dir === 'left') snakeX -= box;
    if (dir === 'right') snakeX += box;
    if (dir === 'up') snakeY -= box;
    if (dir === 'down') snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    eatTail(newHead, snake);

    snake.unshift(newHead);

}

let game = setInterval(drawGame, 100);
