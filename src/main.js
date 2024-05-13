import express from 'express';
import { createUserTable } from './users/user.model.js';
import { userRouter } from './users/user.routes.js';

const app = express();

app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use("/users", userRouter);

// const users = await findUser('something');
// console.log(users);




// const quicksort = (arr) => {
//     if (arr.length <= 1) {
//         return arr;
//     }
//     const pivot = arr[Math.floor(arr.length / 2)]
//     const left = [];
//     const right = [];

//     for (let i = 0; i < arr.lenght; i++){
//         if (arr[i] < pivot) {
//             left.push(arr[i]);
//         } else {
//             right.push(arr[i]);
//         }
//     }

//     return [...quicksort(left), pivot, ...quicksort(right)]

// }

// const mergeArr = (left, right) => {
//     const result = []




// }

// const mergeSort = (arr) => {
//     if (arr.length <= 1) {
//         return arr;
//     }

//     const mid = Math.floor(arr.length / 2);

//     const left = arr.slice(0, mid)
//     const right = arr.slice(mid)

//     return mergeArr(mergeSort(left), mergeSort(right))


// }




app.listen(3001, async () => {
    await createUserTable();
    console.log(`server running on port 3001`)
})
