function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

document.getElementById('json')
    .addEventListener('change', function () {
        const container = document.querySelector('#students-data');
        removeAllChildNodes(container);

        var fr = new FileReader();
        fr.onload = function () {

            let studentsObj = "";
            try {
                studentsObj = JSON.parse(fr.result);
            } catch(err) {
                alert("Coś jest nie tak z plikiem JSON: " + err);
                return ;
            }
            console.log(studentsObj);

            var table = document.getElementById('students-data');

            let sum = 0;
            let counter = 0;
            for (var i = 0; i < studentsObj.students.length; i++) {
                let student = studentsObj.students[i];

                if(student.deleted) {
                    continue;
                }

                sum += student.grade;
                counter += 1;

                var tr = document.createElement('tr');

                var td1 = document.createElement('td');
                var td2 = document.createElement('td');
                var td3 = document.createElement('td');
                var td4 = document.createElement('td');
                var td5 = document.createElement('td');

                var text1 = document.createTextNode(student.id);

                var img = document.createElement("img");
                img.src = student.avatar === null ?
                        "./images/placeholder.jpeg" : student.avatar;
                img.alt = "User avatar";

                var text3 = document.createTextNode(student.firstName);
                var text4 = document.createTextNode(student.lastName);
                var text5 = document.createTextNode(student.grade);

                td1.appendChild(text1);
                td2.appendChild(img);
                td3.appendChild(text3);
                td4.appendChild(text4);
                td5.appendChild(text5);

                tr.appendChild(td1);
                tr.appendChild(td2);
                tr.appendChild(td3);
                tr.appendChild(td4);
                tr.appendChild(td5);

                table.appendChild(tr);
            }

            let average = sum / counter;

            document.getElementById("average").innerHTML = average.toFixed(2);
        }

        fr.readAsText(this.files[0]);
    });