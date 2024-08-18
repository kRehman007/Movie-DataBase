const shows = document.querySelector('.shows');

async function fetching(f, l, val = '') {
  const url = 'https://imdb-top-100-movies.p.rapidapi.com/';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'b6ebbe8c1amsha81a0fd72b247a9p1766e8jsnc82b60330e20',
            'x-rapidapi-host': 'imdb-top-100-movies.p.rapidapi.com'
        }
    };

try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        let result = await response.json();
        
        if (val !== '') {
            result = result.filter((res) => res.title.includes(val));
        }

        result.slice(f, l).forEach((res) => {
            const Div2 = document.createElement('div');
            Div2.classList.add('image');
            const img = document.createElement('img');
            const a = document.createElement('a');
            a.appendChild(img);
            Div2.appendChild(a);

            const Div = document.createElement('div');
            Div.classList.add('about');
            const h1 = document.createElement('h1');
            const p1 = document.createElement('p');
            p1.classList.add('date');
            const p2 = document.createElement('p');
            p2.classList.add('des');

            a.href = res.imdb_link;
            img.src = res.image;
            h1.textContent = res.title;
            p1.textContent = `Released Date: ${res.year}`;
            p2.textContent = res.description;
            Div.appendChild(h1);
            Div.appendChild(p1);
            Div.appendChild(p2);

            const box = document.createElement('div');
            box.classList.add('box1');

            box.appendChild(Div2);
            box.appendChild(Div);

            shows.appendChild(box);
            a.target = '_blank';
        });

    } catch (error) {
        console.error('Fetching error:', error);
    }
}

let findex = 0;
let lindex = 5;

window.addEventListener('load', () => {
    fetching(findex, lindex, '');
});

const btn = document.querySelector('.btn');
btn.addEventListener('click', function () {
    findex += 5;
    lindex = findex + 5;
    const inputBox = document.getElementById('inputBox').value;
    if (inputBox === '') {
        fetching(findex, lindex, '');
    }
});

document.getElementById('search').addEventListener('click', () => {
    document.querySelector('.schBox').style.visibility = 'visible';
});

document.querySelector('#sch').addEventListener('click', () => {
    shows.innerHTML = '';
    findex = 0;
    lindex = 5;
    const inputBox = document.getElementById('inputBox').value;
    if (inputBox === '') {
        return;
    }
    fetching(findex, lindex, inputBox);
    document.querySelector('.btn').style.visibility = 'hidden';
});

document.getElementById('bars').onclick = function () {
    document.getElementById('inputBox').value = '';
    shows.innerHTML = '';
    findex = 0;
    lindex = 5;
    fetching(findex, lindex, '');
    document.querySelector('.schBox').style.visibility = 'hidden';
    document.querySelector('.btn').style.visibility = 'visible';
};
