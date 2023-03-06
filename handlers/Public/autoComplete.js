
const autocompleteSearch = (inp, arr) => {

    let currentFocus;
    inp.addEventListener('input', function (e) {
        let a; let b; let i; const val = this.value;
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        a = document.createElement('DIV');
        a.setAttribute('id', this.id + 'autocomplete-list');
        a.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(a);
        for (i = 0; i < arr.length; i++) {
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                b = document.createElement('DIV');
                b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
                b.innerHTML += arr[i].substr(val.length);
                b.innerHTML += '<input type=\'hidden\' value=\'' + arr[i] + '\'>';
                b.addEventListener('click', function (e) {
                    inp.value = this.getElementsByTagName('input')[0].value;
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    inp.addEventListener('keydown', function (e) {
        let x = document.getElementById(this.id + 'autocomplete-list');
        if (x) x = x.getElementsByTagName('div');
        if (e.keyCode == 40) {

            currentFocus++;
            addActive(x);
        } else if (e.keyCode == 38) {
            currentFocus--;
            addActive(x);
        } else if (e.keyCode == 13) {
            e.preventDefault();
            if (currentFocus > -1) {
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add('autocomplete-active');
    }
    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove('autocomplete-active');
        }
    }
    function closeAllLists(elmnt) {

        const x = document.getElementsByClassName('autocomplete-items');
        for (let i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    document.addEventListener('click', function (e) {
        closeAllLists(e.target);
    });
}
autocompleteSearch(document.getElementById('myInput'), data);


const getTime = () => {
    let city = document.getElementById('myInput').value;

    console.log(city);
    fetch(`https://timezoneapi.io/api/address/?${city}&token=kOxVEvPlHDjw`).then((res) => res.json()).then(
        (data) => {
            if (data.meta.code == 200) {
                console.log(data);
                console.log(data.data.addresses[0].city);
                const time = data.data.addresses[0].datetime.time;
                console.log(time);
                document.getElementById('time').innerHTML = 'Time Zone is:' + '<br>' + time;
            }
        }).catch((error) => { console.log(error); });
}
document.getElementById('btn').addEventListener('click', getTime);

