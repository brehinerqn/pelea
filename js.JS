function iniciar() {
    ganador = ``;
    aleatorio = 0;

    fatality = `💥💥💥💥💥💥💥`;
    powerup = `👵👵👵👵👵👵👵`;

    posicion = [11];
    posicion[0] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[1] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[2] = { pos: `💪`, estado: `defiende`, danio: 20 }; //DEFIENDE
    posicion[3] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[4] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[5] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[6] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[7] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[8] = { pos: `💥`, estado: `ataca`, danio: 100 }; //ATAQUE
    posicion[9] = { pos: `🖕`, estado: `esquiva`, danio: 0 }; //ESQUIVA
    posicion[10] = { pos: `🙈`, estado: `esconde`, danio: 100 }; //ESCONDE

    // console.log(posicion);

    danio = [11];
    for (let i = 0; i <= 10; i++) {
        if (i <= 5) {
            danio[i] = { ataque: i * 3, tipo_ataque: `⚡`, nombre_ataque: `picotazo` }; //PICOTAZO
        }
        if (i >= 6) {
            danio[i] = { ataque: i * 3, tipo_ataque: `🔥`, nombre_ataque: `espuelazo` }; //ESPUELAZO
        }
    }
    fondo = document.getElementById('fondo')
    aleteo = document.getElementById('aleteo')
    fire = document.getElementById('fire')
    cabeza = document.getElementById('cabeza')

    //COMIENZA EL JUEGO
    gallos = {
        'gallo1': {
            posicion: ``,
            estado: ``,
            danio: ``,
            ataque: 0,
            tipo_ataque: ``,
            nombre_ataque: ``,
            danio_recibido: 0,
            vida: 100
        },
        'gallo2': {
            posicion: ``,
            estado: ``,
            danio: ``,
            ataque: 0,
            tipo_ataque: ``,
            nombre_ataque: ``,
            danio_recibido: 0,
            vida: 100
        }
    }

}
function pos_gallos(i) {

    n = Math.round(Math.random() * (9 - 0) + 0); //entre 0 y 9
    gallos['gallo' + i].posicion = posicion[n].pos;
    gallos['gallo' + i].estado = posicion[n].estado;
    gallos['gallo' + i].danio = posicion[n].danio;
}
function ataque(i) {

    if (gallos['gallo' + i].posicion == `💥`) { //ATAQUE
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        gallos['gallo' + i].ataque = danio[n].ataque;
        gallos['gallo' + i].tipo_ataque = danio[n].tipo_ataque;
        gallos['gallo' + i].nombre_ataque = danio[n].nombre_ataque;

        let j = 0;
        if (i == 1)
            j = 2;

        if (i == 2)
            j = 1

        //FATALITY CUANDO EL ENEMIGO TIENE MENOS DEL 10% DE VIDA
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        if (gallos['gallo' + j].vida < 10 && n == 10) {
            gallos['gallo' + i].ataque = 99;
            gallos['gallo' + i].tipo_ataque = fatality;
            gallos['gallo' + i].nombre_ataque = `fatality`;
        }

        //POWERUP CUANDO TIENE MENOS DE 20% DE VIDA
        n = Math.round(Math.random() * (10 - 1) + 1); //entre 1 y 10
        if (gallos['gallo' + i].vida < 20 && n == 10) {
            gallos['gallo' + i].vida += 50;
            gallos['gallo' + i].ataque = 99;
            gallos['gallo' + i].tipo_ataque = powerup;
            gallos['gallo' + i].nombre_ataque = `powerup`;
        }
    } else {
        gallos['gallo' + i].ataque = 0;
        gallos['gallo' + i].tipo_ataque = ``;
        gallos['gallo' + i].nombre_ataque = ``;
        gallos['gallo' + i].danio_recibido = 0;

    }
    //colocar sonido cuando ataque

}
function reducir_vida(i) {
setTimeout(() => {
    

    let j = 0;
    if (i == 1)
        j = 2;

    if (i == 2)
        j = 1

    if (gallos[`gallo` + i].posicion == `💪`) { //DEFIENDE

        if (gallos[`gallo` + j].tipo_ataque != fatality) {

            let d = Math.round(gallos['gallo' + j].ataque * 0.2);

            gallos['gallo' + i].danio_recibido = d;
            gallos['gallo' + i].vida -= d;

        } else {
            let d = gallo['gallo' + j].ataque;

            gallos['gallo' + i].danio_recibido = d;
            gallos['gallo' + i].vida -= d;
        }
    }

    if (gallos[`gallo` + i].posicion == `💥` ||
        gallos[`gallo` + i].posicion == `🙈`) { //ATAQUE O ESCONDE

        let d = gallos['gallo' + j].ataque;

        gallos['gallo' + i].danio_recibido = d;
        gallos['gallo' + i].vida -= d;
    }
}, 3000);


}
function encontrar_ganador() {
    

    if (gallos[`gallo1`].vida <= 0) {
        $('#explo1').css({ 'opacity': '1' });
        $('#gallo1').css({ 'opacity': '0' });
        ganador = `GANADOR CHARIZARD 2`;
    }

    if (gallos[`gallo2`].vida <= 0) {
        $('#explo2').css({ 'opacity': '1' });
        $('#gallo2').css({ 'opacity': '0' });
        ganador = `GANADOR CHARIZARD 1`;
    }

    if (gallos['gallo1'].vida <= 0 && gallos['gallo2'].vida <= 0) {
        $('#explo1').css({ 'opacity': '1' });
        $('#gallo1').css({ 'opacity': '0' });
        $('#explo2').css({ 'opacity': '1' });
        $('#gallo2').css({ 'opacity': '0' });

        ganador = `EMPATE`;
    }

    setTimeout(() => {
        if (gallos[`gallo1`].vida <= 0) {
            $('#la1').css({ 'opacity': '1' });
            $('#explo1').css({ 'opacity': '0' });
        }

        if (gallos[`gallo2`].vida <= 0) {
            $('#la2').css({ 'opacity': '1' });
            $('#explo2').css({ 'opacity': '0' });


        }

        if (gallos['gallo1'].vida <= 0 && gallos['gallo2'].vida <= 0) {
            $('#la2').css({ 'opacity': '1' });
            $('#la1').css({ 'opacity': '1' });
            $('#explo1').css({ 'opacity': '0' });
            $('#explo2').css({ 'opacity': '0' });


        }

    }, 1500);
}
function mostrar_ganador() {
    if (ganador != ``) {
        console.log(`${ganador}`)
        fondo.pause();
        fondo.currentTime = 0;
        aleteo.pause();
        aleteo.currentTime = 0;
        $('.row').css({ 'filter': 'grayscale(100%)' });
        $('body').css({ 'backdrop-filter': 'grayscale(100%)' });
        $('#game').css({ 'opacity': '1' });
        $('.botton').css({ 'opacity': '1' });
        $('.gana').html(`${ganador}`);
        $('.gana').css({ 'opacity': '1' });
    }
}
function juego() {

    $('.row').css({ 'filter': 'grayscale(0%)' });
    $('body').css({ 'backdrop-filter': 'grayscale(0%)' });
    $('.botton').css({ 'opacity': '0' });
    $('#game').css({ 'opacity': '0' });
    $('.gana').css({ 'opacity': '0' });


    console.log(`GALLO 1: ${gallos[`gallo1`].vida}% - GALLO 2: ${gallos[`gallo2`].vida}%`);

    pos_gallos(1);
    pos_gallos(2);

    ataque(1);
    ataque(2);

    animar_ataque(1);
    animar_ataque(2);


    reducir_vida(1);
    reducir_vida(2);

    descuento(1);
    descuento(2);

    porciento(1);
    porciento(2);

    encontrar_ganador();


    console.log(`GALLO 1: ${gallos[`gallo1`].posicion} ${gallos[`gallo1`].tipo_ataque} (${gallos[`gallo1`].ataque}%) - GALLO2: ${gallos[`gallo2`].posicion} ${gallos[`gallo2`].tipo_ataque} (${gallos[`gallo2`].ataque}%)`);
    console.log(`----------------------------------------------------------`)

    if (ganador == ``) {
        setTimeout(() => {
            juego();
        }, 3000);
    }
}
function animar_ataque(i) {
    let j = 0;
    if (i == 1)
        j = 2;

    if (i == 2)
        j = 1
    if (gallos['gallo' + i].estado == 'ataca') {
        let a = gallos['gallo' + i].nombre_ataque + i;



        if (gallos['gallo' + i].nombre_ataque == "picotazo") {
            $('#bola' + i).css({ animation: a + ' 2s ease' })
            $('#gallo' + i).css({ animation: `sexy${i} 2s ease` });
            $('#reducir' + i).css({ animation: 'rede 2s ease 1s' })

            fire.play();
        }
        if (gallos['gallo' + i].nombre_ataque == "espuelazo") {
            $('#gallo' + i).css({ animation: a + ' 2s ease' });
            $('#reducir' + i).css({ animation: 'rede 1s ease 1s' })
            let b = 'fuego' + i;
            if (gallos['gallo' + j].nombre_ataque == "espuelazo") {
                $('#golpe3').css({ animation: 'fuego_centro 0.5s ease 1s' });
                $('#reducir' + i).css({ animation: 'rede 1s ease 1s' });

            }

            else {
                $('#golpe' + i).css({ animation: b + ' 0.5s ease 1s' });
                $('#reducir' + i).css({ animation: 'rede 1s ease 1s' });
            }
            cabeza.play();
        }
        $('#gallo' + i).on('animationend', function () {
            $(this).css({ animation: 'none' });
            cabeza.pause();
            mostrar_ganador();
        });
        $('#reducir' + i).on('animationend', function () {
            $(this).css({ animation: 'none' });
            cabeza.pause();
            mostrar_ganador();
        });

        $('#bola' + i).on('animationend', function () {
            $(this).css({ animation: 'none' });
            fire.pause();
            mostrar_ganador();
        });
        $('#golpe' + i).on('animationend', function () {
            $(this).css({ animation: 'none' });
            fire.pause();
            mostrar_ganador();
        });
    }
    let a = gallos['gallo' + i].estado + i;
    if ((gallos['gallo' + i].estado == "defiende")) {

        $('#gallo' + i).css({ animation: a + ' 2s ease 1s' });
        $('#reducir' + i).css({ animation: 'rede 1s ease 1s' });
    }
    if (gallos['gallo' + i].estado == "esquiva") {
        $('#gallo' + i).css({ animation: a + ' 2s ease' });
        $('#reducir' + i).css({ animation: 'rede 1s ease 1s' });
    }
    if (gallos['gallo' + i].estado == "esconde") {
        $('#gallo' + i).css({ animation: a + ' 2s ease' });
        $('#reducir' + i).css({ animation: 'rede 1s ease 1s' });
    }
    $('#gallo' + i).on('animationend', function () {
        $(this).css({ animation: 'none' })
        mostrar_ganador();
    });
}
$(`#inicio`).click(function () {
    iniciar();
    juego();



    fondo.play();
    aleteo.play();

})
function descuento(i) {
    let j = 0;
    if (i == 1)
        j = 2;

    if (i == 2)
        j = 1
    $('#vida' + i).css({ width: `${(gallos['gallo' + i].vida)}%` });

    if (gallos['gallo' + i].vida <= 20) {
        $('#vida' + i).css({ background: 'white' });
    }
    if (gallos['gallo' + i].vida <= 50 && gallos['gallo' + i].vida > 20) {
        $('#vida' + i).css({ background: 'orange' });
    }
    if (gallos['gallo' + i].vida <= 80 && gallos['gallo' + i].vida > 50) {
        $('#vida' + i).css({ background: 'blue' });
    }
    if (gallos['gallo' + i].vida <= 100 && gallos['gallo' + i].vida > 80) {
        $('#vida' + i).css({ background: 'chartreuse' });
    }
    $('#reducir' + i).html("-" + gallos['gallo' + i].danio_recibido);
}
function porciento(i) {
    if (gallos['gallo' + i].vida < 0) {
        gallos['gallo' + i].vida = 0;
    }
    $('#pvida' + i).html(gallos['gallo' + i].vida + '%');

}


