/*******************************************
 * Megan Koh
 * 09/12/18
 * Professor Keith VanderLinden
 * CS 336: Lab 02
 *******************************************/

// Exercise 2.1 - Encapsulation
// Person object prototype
function Person(name, birthdate, friends, greeting) {
	this.name = name;
	this.birthdate = birthdate;
	this.friendsList = friends;
	this.greeting = greeting;
}

// Name change
Person.prototype.changeName = function(newName) {
	this.name = newName;
}

// Age accessor
Person.prototype.computeAge = function() {
	var today = new Date();
	var birthdate = new Date(this.birthdate);
	var currentAge = today.getFullYear() - birthdate.getFullYear();
	var ageByMonth = today.getMonth() - birthdate.getMonth();
	if (ageByMonth < 0 || ageByMonth === 0 && today.getDate() < birthDate.getDate()) {
		currentAge--;
	}
	return "Age: " + currentAge;
}

// Add a new friend
Person.prototype.addFriend = function(friendName) {
	this.friendsList.push(friendName);
}

// Print a greeting
Person.prototype.printGreeting = function() {
	return this.greeting;
}

// implementation
var frens = ["Megan", "Derek",  "Lauren"];
var p1 = new Person("Arie Williams", "1996/10/05", frens, "What's up, dawg?");
console.log(p1);
p1.changeName("Adrianna");
console.log(p1);
console.log(p1.computeAge());
p1.addFriend("Toussaint");
console.log(p1);
console.log(p1.printGreeting());


// Exercise 2.2 - Inheritance and Polymorphism
// Student sub-class
function Student(name, birthdate, friends, greeting, major) {
	Person.call(this, name, birthdate, friends, greeting);
	this.major = major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.printGreeting = function() {
	return this.greeting;
}

var frens2 = ["Jennifer", "Daeun", "Judy"];
var s1 = new Student("Kelly Oh", "1996/04/20", frens2, "Hello, I am a Calvin student.", "Computer Science");
console.log(s1);
console.log(s1.printGreeting())
console.log(s1.computeAge());
s1.addFriend("Ivanna");
console.log(s1);
console.log(s1 instanceof Person);
