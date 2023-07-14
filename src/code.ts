const { Observable } = require('rxjs');
const { map, pluck, filter } = require('rxjs/operators');

const users = {
  data: [
    {
      id: 1,
      status: 'active',
      age: 14,
    },
    {
      id: 2,
      status: 'inactive',
      age: 32,
    },
    {
      id: 3,
      status: 'active',
      age: 10,
    },
    {
      id: 4,
      status: 'inactive',
      age: 54,
    },
  ],
};
const mockAPIData = new Observable((subscriber: any) => {
  subscriber.next(users);
}).pipe(
  pluck('data'),
  filter((value: any) => {
    value.length >= 5;
  }),
  map((value: any) => {
    return value.filter((user: any) => user.status === 'active');
  }),
  map((value: any) => {
    return (
      value.reduce((sum: number, user: any) => sum + user.age, 0) / value.length
    );
  }),
  map((age: number) => {
    if (Math.round(age) < 15) {
      throw new Error('Average age is too young');
    } else {
      return age;
    }
  })
);

const observer = {
  next: (x: any) => console.log('got value ' + x),
  error: (err: any) => console.log('something wrong occurred: ' + err),
  complete: () => console.log('done'),
};

mockAPIData.subscribe(observer);
