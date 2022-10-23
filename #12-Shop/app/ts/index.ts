const user = "Hello world!";
console.log(user);

let user1: string | number;

user1 = "1";
user1 = 1;

console.log(user1);

const getName = (name: "John" | "Ivan" | true): void => {
    console.log(name);
};

getName(true);

type CityList = "Kyiv" | "Odessa" | 'London' | 'Warszawa';

interface User {
    firstName: string;
    lastName: string;
    age: number;
    city?: CityList;
    address?: string;
}

const user3: User = {
    firstName: 'John',
    lastName: 'Smith',
    age: 14,
    city: 'London',
    address: 'Ivana Franka'
}