(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{17:function(e,t,n){e.exports=n(43)},22:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(10),u=n.n(i),o=n(15),l=n(11),c=n(12),s=n(14),d=n(13),m=n(16),f=function(e){var t=e.addEntry,n=e.updateNewName,a=e.updateNewNumber;return r.a.createElement("form",{onSubmit:t},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{onChange:n})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{onChange:a})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4")))},p=function(e){var t=e.filter;return r.a.createElement("div",null,"rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{onChange:t}))},v=function(e){var t=e.person,n=e.deleteFunction;return r.a.createElement("tr",null,r.a.createElement("td",null,t.name),r.a.createElement("td",null,t.number),r.a.createElement("td",null,r.a.createElement("button",{onClick:function(){return n(t)}},"poista")))},h=function(e){var t=e.people,n=e.deleteFunction;return r.a.createElement("table",null,r.a.createElement("tbody",null,t.map(function(e){return r.a.createElement(v,{key:e.name,person:e,deleteFunction:n})})))},E=(n(22),function(e){var t=e.success;return t?r.a.createElement("div",{id:"message"},t):null}),N=n(2),w=n.n(N),b=function(e){return"".concat("/api/persons","/").concat(e)},y={all:function(){return w.a.get("/api/persons").then(function(e){return e.data})},insert:function(e){return w.a.post("/api/persons",e).then(function(e){return e.data})},update:function(e){return w.a.put(b(e.id),e).then(function(e){return e.data})},remove:function(e){return w.a.delete(b(e))}},k=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(s.a)(this,Object(d.a)(t).call(this,e))).addEntry=function(e){var t=function(e){return y.insert(e).then(function(e){var t=n.state.persons.concat(e),a="Lis\xe4ttiin henkil\xf6 ".concat(e.name);n.setState({persons:t,successfulNotification:a}),n.filterPeople(t,n.state.filter),n.hideNotification()})};e.preventDefault();var a=n.state.newName,r=n.state.newNumber,i={name:a,number:r},u=n.state.persons.find(function(e){return e.name===i.name});u?window.confirm("".concat(a," on jo luettelossa. Korvataanko vanha numero uudella?"))&&function(e,a){var r=Object(o.a)({},e,{number:a});y.update(r).then(function(e){var t=n.state.persons.map(function(e){return e.id===r.id?r:e}),a=n.state.displayedPeople.map(function(e){return e.id===r.id?r:e}),i="Henkil\xf6n ".concat(r.name," puhelinnumero vaihdettu");n.setState({persons:t,displayedPeople:a,successfulNotification:i}),n.hideNotification()}).catch(function(e){t(r),window.location.reload()})}(u,r):t(i)},n.hideNotification=function(){return setTimeout(function(){n.setState({successfulNotification:void 0})},5e3)},n.filterHandler=function(e){return n.filterPeople(n.state.persons,e.target.value.toLowerCase())},n.filterPeople=function(e,t){var a=0===t.length?e:e.filter(function(e){return e.name.toLowerCase().includes(t)});n.setState({filter:t,displayedPeople:a})},n.remove=function(e){window.confirm("Haluatko varmasti poistaa henkil\xf6n ".concat(e.name,"?"))&&y.remove(e.id).then(function(t){var a=n.state.persons.filter(function(t){return t.id!==e.id}),r=n.state.displayedPeople.filter(function(t){return t.id!==e.id}),i="Henkil\xf6 ".concat(e.name," poistettu");n.setState({persons:a,displayedPeople:r,successfulNotification:i}),n.hideNotification()})},n.updateNewName=function(e){return n.setState({newName:e.target.value})},n.updateNewNumber=function(e){return n.setState({newNumber:e.target.value})},n.state={persons:[],displayedPeople:[],newName:"",newNumber:"",filter:""},n}return Object(m.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;y.all().then(function(t){return e.setState({persons:t,displayedPeople:t})})}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("h1",null,"Puhelinluettelo"),r.a.createElement(E,{success:this.state.successfulNotification}),r.a.createElement(p,{filter:this.filterHandler}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(h,{people:this.state.displayedPeople,deleteFunction:this.remove}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi / muuta olemassaolevan numeroa"),r.a.createElement(f,{addEntry:this.addEntry,updateNewName:this.updateNewName,updateNewNumber:this.updateNewNumber}))}}]),t}(r.a.Component);u.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[17,2,1]]]);
//# sourceMappingURL=main.0e96e127.chunk.js.map