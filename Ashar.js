(async function () {
    const response = await fetch('./data.json');
    const data = await response.json()

    let RATINGinput = document.getElementById('RATINGinput');
    let GENRESinput = document.getElementById('GENRESinput');
    let YEARinput = document.getElementById('YEARinput');
    let YEARbrowsers = document.getElementById(`YEARbrowsers`);
    let LANGUAGEinput = document.getElementById('LANGUAGEinput');
    let LANGUAGEbrowsers = document.getElementById(`LANGUAGEbrowsers`);
    let RATINGbrowsers = document.getElementById(`RATINGbrowsers`);
    let btn = document.getElementById('btn');
    let thead = document.getElementById('thead');


    RATINGinput.value = 'ALL';
    GENRESinput.value = 'ALL';
    YEARinput.value = 'ALL';
    LANGUAGEinput.value = 'ALL';



    RATINGinput.addEventListener('change', function (e) {
        if (e.target.value == "") {
            e.target.value = "ALL"
        }
    })
    YEARinput.addEventListener('change', function (e) {
        if (e.target.value == "") {
            e.target.value = "ALL"
        }
    })
    LANGUAGEinput.addEventListener('change', function (e) {
        if (e.target.value == "") {
            e.target.value = "ALL"
        }
    })
    GENRESinput.addEventListener('change', function (e) {
        if (e.target.value == "") {
            e.target.value = "ALL"
        }
    })



    let GENRESbrowsers = document.getElementById(`GENRESbrowsers`);
    data.forEach(obj => {
        if (!GENRESbrowsers.innerHTML.includes(obj.genres)) {
            GENRESbrowsers.innerHTML += `<option value="${obj.genres}">`
        }
    });

    data.forEach(obj => {
        const Year = obj.release_date.slice(0, 4);
        if (!YEARbrowsers.innerHTML.includes(Year)) {
            YEARbrowsers.innerHTML += `<option value="${Year}">`
        }
    });

    data.forEach(obj => {
        if (!LANGUAGEbrowsers.innerHTML.includes(obj.original_language)) {
            LANGUAGEbrowsers.innerHTML += `<option value="${obj.original_language}">`
        }
    });

    data.forEach(obj => {
        if (!RATINGbrowsers.innerHTML.includes(obj.vote_average)) {
            RATINGbrowsers.innerHTML += `<option value="${+(obj.vote_average)}">`
        }
    });


    btn.addEventListener('click', function () {

        let warning = document.getElementById('warning');
        warning.style.display = 'none';

        thead.innerHTML = `
            <tr>
            <th style="border: 2px solid rgb(18, 131, 255); text-align: center; width: 8rem; height: 6rem; font-size: 20px;">RANK</th>
            <th style="border: 2px solid rgb(18, 131, 255); text-align: start; padding-left: 1.5rem; height: 6rem; font-size: 20px;">MOVIES</th>
                <th style="border: 2px solid rgb(18, 131, 255); text-align: start; padding-left: 1.5rem; width: 12rem; height: 6rem; font-size: 20px;">YEAR</th>
            </tr>
        `
        if (!(GENRESinput.value === "ALL" && YEARinput.value === "ALL" && LANGUAGEinput.value === "ALL" && RATINGinput.value === "ALL")) {
            let results = data;

            if (LANGUAGEinput.value !== "ALL") {
                results = results.filter(object => object.original_language === LANGUAGEinput.value);
            }
            if (GENRESinput.value !== "ALL") {
                let arr = GENRESinput.value.split(',')
                arr.forEach(val => {
                    results = results.filter(object => {
                        return object.genres.includes(val);
                    })
                })
            }
            if (YEARinput.value !== "ALL") {
                results = results.filter(object => object.release_date.slice(0, 4) === YEARinput.value);
            }
            if (RATINGinput.value !== "ALL") {
                results = results.filter(object => object.vote_average === (+RATINGinput.value));
            }

            if (!(results.length === 0)) {
                results.forEach(obj => {
                    thead.innerHTML += ` 
                <tr>
                    <td style="text-align: center; border-right: 2px solid rgb(18, 131, 255); height: 6rem; border-bottom: 2px solid rgb(18, 131, 255); font-size: 20px;">
                        ${obj.vote_average}
                    </td>
                    <td style="border-left: 2px solid rgb(18, 131, 255); border-right: 2px solid rgb(18, 131, 255); padding-left: 1.5rem; height: 6rem; border-bottom: 2px solid rgb(18, 131, 255); font-size: 20px; font-weight: bold;">
                        <a style="text-decoration: none; color: rgb(18, 131, 255);" href="${obj.homepage}" target="_blank">${obj.title}</a>
                        <p style="font-size: 15px; margin-top: 8px">${obj.genres}</p>
                        <p style="border: 1px solid black; background-color: RGB(228, 228, 228); width: 6rem; text-align: center; font-size: 18px; margin-top: 8px; border-radius: 5px;">${obj.certification}</p>
                        </td>
                        <td style="border-left: 2px solid rgb(18, 131, 255); padding-left: 1.5rem; height: 6rem; border-bottom: 2px solid rgb(18, 131, 255); font-size: 20px;">
                        ${obj.release_date.slice(0, 4)}
                    </td>
                </tr>
                `
                })
            }
            else {
                thead.innerHTML += ` 
                <tr>
                    <td style="text-align: center; border-right: 2px solid black; height: 6rem; border-bottom: 2px solid;"></td>
                    <td style="border-left: 2px solid black; border-right: 2px solid black; padding-left: 1.5rem; height: 6rem; border-bottom: 2px solid; font-size: 20px;">No Movies found according to the information</td>
                    <td style="border-left: 2px solid black; padding-left: 1.5rem; height: 6rem; border-bottom: 2px solid;"></td>
                </tr>
                `

            }
        }
        else {
            warning.style.display = 'block';
        }
    })
})();
