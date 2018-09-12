/* Megan Koh
 * 09/12/18
 * Professor Keith VanderLinden
 * Lab 02
 */


 // Exercise 2.1 - Encapsulation

// person object prototype
function Person(name, birthdate, friends, greeting) {
	this.name = name;
	this.birthdate = birthdate;
	this.friendsList = friends;
	this.greetings = greeting;
}

// name change method
Person.prototype.changeName = function(newName) {
	this.name = newName;
}

// get age method
Person.prototype.computeAge = function(date) {
	var today = new Date();
	var birthdate = new Date(date);
	var currentAge = today.getFullYear() - birthdate.getFullYear();
	var ageByMonth = today.getMonth() - birthdate.getMonth(); 
	if (ageByMonth < 0 || ageByMonth === 0 && today.getDate() < birthDate.getDate()) {
		currentAge--;
	}
	console.log(currentAge);
}

Person.prototype.addFriend = function(friends, friendName) {
	var friendsListCopy = friends.push(friendName);
	this.friendsList = friendsListCopy;
	return this.friendsList;
}

// implementation
var frens = ["Megan", "Derek"]
var p1 = new Person("Arie Williams", "1996/10/05", frens, "What's good?");
console.log(p1);
p1.changeName("Adrianna");
console.log(p1);
console.log(p1.computeAge);
console.log(p1.addFriend(frens, "Kelly"));

