import { useEffect, useState } from "react";

function TicTacToe() {
    const [table, setTable] = useState([
        /*
        Több dimenziós tömb, mert sorokat és oszlopokat kell reprezentálni,
        külső tömbben lesznek a soraink, három sor három tömbelemmel, 3 oszloppal gyakorlatilag 
        */
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
        /*
        ez lehet majd egy üres tömb is mert megcsináljuk automatikusan mindig ezt a points-nak a useEffect-jével, 
        ahol setTable-t beállítjuk erre ami itt van tömbökre 
        */
    ]);
    /*
    Hogy x-et vagy 0-át rakjon az attól függ (amit majd rakni fog a clickCell függvénnyel), hogy melyik körben vagyunk 
    aminek a useState-je alapállapotban true lesz és false-ra fog változni, ha másik körben vagyunk
    */
    const [round, setRound] = useState(true);
    //össze kell számolni a pontjainkat 
    const [points, setPoints] = useState({
        x: 0,
        o: 0
    });
    /*
    points az egy objektum lesz és két kulccsal fog rendelkezni az x-vel és a o-val és mindakettő nulla értéket vesz fel 
    és ha megváltozott a table-nek az értéke akkor fogunk pontokat számolni ehhez készítünk egy useEffect-et a clickCell után 
    */

    //kell nekünk ide egy kattintás
    const clickCell = (row, col) => {
        /*
        még az a probléma, hogy amelyik mezőbe már raktunk azt felül tudjuk írni,
        pl. ha belekattintunk az egyik mezőbe és rakunk egy x-et és utána mégegyszer belekattintunk ugyanabba a mezőbe
        akkor az x-ből 0-át fog csinálni 
        ezért, amennyiben a table[row][col] nem egyenlő egy üres string-vel, akkor return-ölünk és nem tudjuk módosítani
        -> 
        */
        if (table[row][col] !== "");
        return;

        /*
        ha a round amit felette csináltunk az true akkor rakjon x-et, ha viszont false, akkor rakjon 0-át
        -> const char = round ? "x" : "0";
        és minden körnek cellClick-nek a végén azt fogjuk mondani, hogy setRound(r=>!r);
        éppen az ellentetjére változtatjuk 

        t[row][col] = "x"; 
        helyett, pedig az lesz
        t[row][col] = char;

        tehát, attól függöen, hogy melyik körben vagyunk x-et vagy 0-át fog tenni, a table bizonyos x-y koordinátájú 
        cell-jébe, ahova kattintottunk és a setTable-vel a table mindig frissítjük 
        */
        const char = round ? "x" : "0";
        /*
        clickCell-nek tudna kellene, azt hogy hányadik sorban és hányadik oszlopban járunk 
        és ezt úgy fogjuk megtudni, hogy megadjuk paraméternek a row és a col-t
        készítünk egy onClick-et a className="cell" div-nek, ahol megkapjuk az i meg a j-t 
        tehát a row-t és a col-t 
        <div onClick={()=> clickCell(i, j)}
        key={j} className="cell">{table[i][j]}</div>
 
        itt pedig kiírjuk console.log(row, col)
        jó lett mert ha belekattintunk az első oszlop második és harmadik-jába akkor -> 1 0 és 2 0 
        tehát a column az 0 (első oszlop) és a sor 1 (2-dik sor) 2 (harmadik sor)
 
        console.log(table[row],[col]);
        ezzel, pedig oda, ahova kézzel beírtunk valamit, tehát tettünk egy x-et és rakkatintunk arra a mezőre 
        oda kiírja a konzol, hogy x, ahova egy 0-át, oda pedig kiírja, hogy 0
        ahova nincsen semmi se beírva oda meg egy üres string-et 
 
        de nekünk nem erre van szükségünk, hanem arra, hogy table-ön a row és a col-t meg tudjuk határozni 
        méghozzá olyan formában 
 
        const t = [...table};
        t[row][col] = "x";
 
        setTable(t);
        most mindegyiket x-re határoztuk meg, tehát a böngészőben kiválasztunk a table-ben valamelyik cellát és oda rákattintunk,
        akkor rakni fog oda egy x-et 
        */
        //console.log(row, col);
        console.log(table[row], [col]);

        const t = [...table];//hogy ne ugyanaz a refencia legyen, hanem csak lemásoldjuk a táblázat elemeit 
        t[row][col] = char;

        setTable(t);
        setRound(r => !r);
    };

    useEffect(() => {
        /*
        Ha a lenti tömbbe megadunk egy változót pl. hogy round az folyamatosan módosul és amikor módosult a roundnak 
        az értéke abban az esetben történik valami, lefutatjuk a useEffectünket

        Elöször úgy módosul, hogy megadjuk az értékét, utána pedig, úgy hogy a round-ot folyton változtatjuk az ellentétére 
        setRound(r => !r); és a Történik valami-t pedig folyamatosan, minden egyes változásnál kiírja
        */
        //console.log("Történik valami!");
        /*
        Ez azért jó nekünk, mert itt ki tudjuk számolni a pontjainkat 
        hogy fogunk pontokat számolni
        */

        for (let row = 0; row < table.length; row++) {
            /*
            itt meg kell néznünk, hogy az elem üres-e (rowEl) x-e vagy o-e
            let xRowPoints = 0
            let oRowPoints = 0
            */
            let xRowPoints = 0;
            let oRowPoints = 0;
            //ugyanigy ki fogjuk számolni a pontokat ha nem egy sorban, hanem egy oszlopban jön össze a 3 
            let xColPoints = 0;
            let oColPoints = 0;
            for (let col = 0; col < table.length; col++) {
                //itt soronként megyünk végig
                const rowEl = table[row][col];
                // a table-nek a soradik és az oszlopadig eleme

                const colEl = table[col][row];
                /*
                Mindig a row (mivel az van a külső ciklusban) megy lassabban, tehát a row nulláról kezdi 3-szor lemegy a col 
                row 1 lesz 3-szor lemegy a col de ezt megfordítjuk itt table[col][row], mivel hogy a col gyorsabban vált 
                ezért az lesz a nulla egy kettő és utána lesz a row 
                */

                console.log(rowEl);
                /*
                Úgy megy sorban az elemekkel végigmegy a 0-dik soron utána végigmegy az első soron és a legvégén a harmadik soron 
                tehát nulladik sor 0 oszlop 1 oszlop 2 oszlop utána első sor 0 oszlop 1 oszlop 2 oszlop és a legvégén 2 sor ugyanugy az oszlopok 
    
                modnjuk így néz ki a böngészőben a táblázatunk 
                ["x", "o", "x"],
                ["o", "x", "o"],
                ["x", "o", "x"]
    
                akkor ezt fogjuk látni a konzolon -> 
                x
                o
                x
                ************************
                o
                x
                o
                ************************
                x
                o
                x
                */
                if (rowEl === "x")
                    xRowPoints++;
                else if (rowEl === "o")
                    oRowPoints++;

                //ezt késöbb csináltuk a col-okat
                if (colEl === "x")
                    xColPoints++;
                else if (colEl === "o")
                    oColPoints++;
                /*
                és akkor meg tudjuk nézni, hogy az adott sorban hány pontja van az x-nek és hány pontja van a o-nek
                a rowEl nem lehet egyszerre x és o és akkor azt már ne ellenőrizze, ha már a rowEl x lett 
                ezek egymástól függnek, ha az egyik egyik aakkor a másik már nem lehet 
                */
                console.log(`${xRowPoints} - ${oRowPoints}`);
                /*
                 0 - 0-val kezdődik
                 0 - 0
                 0 - 0
                 ["x", "", ""],
                 ["", "", ""],
                 ["", "", ""]   
                 de ha rakunk egy x-et, akkor 
                 1 - 0 
                 0 - 0
                 0 - 0
                 ["x", "o", ""],
                 ["", "", ""],
                 ["", "", ""] 
                 rakunk egy o-át akkor 
                 1 - 1
                 0 - 0
                 0 - 0
 
                 így pedig 
                 
                 ["x", "x", "x"],
                 ["o", "0", ""],
                 ["", "", ""] 
                 3 - 0 
                 0 - 2
                 0 - 0
                */
                /*
                és ha az x === 3, const [points, setPoints] = useState({
                    x: 0,
                    o: 0
                });
                akkor hozzá kell adni a points-nak az x kulcsához eggyet 
                és ezt eúgy csináljuk -> 
                */
                if (xRowPoints === 3 || xColPoints === 3) {
                    setPoints((p) => ({ ...p, x: p.x + 1 }));
                    /*
                    spread operator müdödik az objektumoknál is, itt kibontjuk az objektumot és az x-et úgy írjuk felül, hogy a 
                    p, tehát a korábbi érték x plusz 1 lesz 
                    és a results-ban ki tudjuk írni a points.x-et -> 
                    <div className="result">
                    x:{points.x}
                    </div>
                    és ha kijött egy sorban az 3x akkor, x:1 lesz 
    
                    és ez teljesen ugyanigy lesz if else-vel a o-ra 
                    */
                } else if (oRowPoints === 3 || oColPoints === 3) {
                    setPoints((p) => ({ ...p, o: p.o + 1 }));
                }
                /*
                x és az o pontokat egy két osztható valamiben fogjuk megjeleníteni és a result-ot és result-cell-eket pedig formázuk css-ben 
                <div className="result-cell">
                    X:{points.x}
                </div>
                    O:{points.o}
                <div className="result-cell"></div>
                </div>

                ugyanigy megcsináljuk a col-okra, de akkor hozzá lehet írni
                if (xRowPoints === 3) {
                    setPoints((p) => ({ ...p, x: p.x + 1 })); 
                ehhez, úgyhogy ||xColpoints === 3 és akkor az if így fog kinézni ->
                if (xRowPoints === 3 || xColPoints === 3)

                össze kell szedni az átlós pontokat egy for ciklussal kezdünk 
                */
                let xDiag1 = 0;
                let oDiag1 = 0;
                let xDiag2 = 0;
                let oDiag2 = 0;
                for (let i = 0; i < table.length; i++) {
                    console.log(table[i][i]);
                    /*
                    akkor ez így az egyik átló lesz table[i][i], méghozzá a fő átló, ami balról jobbra megy, 
                    mivel 0-0 1-1, 2-2 lesz a for ciklusnak az i változója 
                    lérehozánk két változót a for ciklus elé 
                    let xDiag = 0;
                    let oDiag = 0;

                    hogy lehet a másik atlót megkapni, hogy csinálunk egy j változót, ami 2-i lesz, mert a 2-i az úgy lesz, hogy 
                    2-0, ami kettő, tehát az i nulla akkor az első sorban vagyunk 2-i 0 tehát a harmadik oszlop utána mindegyik 1 lesz 
                    és a ha az i 2 tehát harmadik sorban vagyunk és j nulla lesz tehát az elsó oszlopban és akkor így kapjuk meg a fordított 
                    keresztátlót 
                    */
                    const j = 2 - i;
                    if (table[i][i] === "x")
                        xDiag1++;
                    else if (table[i][i] === "o")
                        oDiag1++;
                    if (table[i][j] === "x")
                        xDiag2++;
                    else if (table[i][j] === "o")
                        oDiag2++;
                }

                if (xDiag1 === 3 || xDiag2 === 3)
                    setPoints((p) => ({ ...p, x: p.x + 1 }));
                else if (oDiag1 === 3 || oDiag2 === 3)
                    setPoints((p) => ({ ...p, o: p.o + 1 }))
            }
        }, [round]);



    /*
    Ha valakinek lett egy pontja, akkor újra kell csinálnunk a táblát, le kell törölni
    amit megcsinálunk itt a useEffect-ben, amiben a points tömb változására fogunk reagálni 
    és a table alaphelyzetbe fogjuk rakni
    ez azért jó, mert elöször akkor változik a points-nak az alapértéke megkapja ezt az alapértéket
    const [points, setPoints] = useState({
        x: 0,
        o: 0
    });
    a játék kezdetekor és akkor be is állítja a kezdőértéket a table-nek, ahol azt mondjuk, hogy a table kezdőértéke 
    nem az lesz, amit itt megcsináltunk a setTable-ben, hanem üres tömb, mert ugyis megkapja minden játék kezdetekor itt ami a setTable-ben van
    */
    useEffect(() => {
        setTable([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);

        /*
        itt azt csináljuk meg, hogy ki kezdjen, hogyha valaki nyert, akkor setRound() és akkor az játszon(kezdjen), aki nem 
        nyert és ugye az nyer mindig, aki utoljára tesz, ezért a SetRound()-nak az lesz az értéke, hogy nem r (r=>!r)
        akkor mindig a másik kezd de ez így mégsem fogja azt beállítani 
        */
        setRound(r => !r);
    }, [points]);

    /*
    Eredmények teljes törlése, ehhez létrehozunk egy button-t és itt egy newGame függvényt 
    <button onClick={newGame}>Új játék</button>
    */

    const newGame = ()=> {
        setTable([
            ["", "", ""],
            ["", "", ""],
            ["", "", ""]
        ]);

        setRound(true);

        setPoints({
            x: 0,
            o: 0
        })
    };

    return (
        <div className="container">
            <div className="result">
                <div className="result-cell">
                    X:{points.x}
                </div>
                O:{points.o}
                <div className="result-cell"></div>
            </div>
            <div className="table">
                {
                    table.map((row, i) =>
                        row.map((col, j) =>
                            <div onClick={() => clickCell(i, j)}
                                key={j} className="cell">{table[i][j]}</div>
                        )
                    )
                }
            </div>

            <button onClick={newGame}>Új játék</button>
        </div>
    );
}

export default TicTacToe

/*
Container-en belül lesz valami, ami az eredményeket mutatja className=results, 
és lesz egy táblázat is className=table, amiben a négyzetek találhatóak, amibe majd bele lehet kattintani
-> formázás css-ben
*/

/*
    return(
        <div className="container">
            <div className="result"></div>
            <div className="table"></div>
        </div>
    )

így még nem látszik semmi de ha a table-ben de a className="table" div-ben végigiterálunk a table-ön,
ez egy kis faramuci lesz, mert ha így csináljuk
<div className="table">
    {
        table.map(()=> <div><div/>)
    }
</div>

akkor az, azért nem jó, mert, hogy ezek még csak a sorok ["", "", ""]

és ezért -> 

<div className="table">
    {
        table.map((row, i)=> {

        })
    }
</div>

row az a sorokat reprezentálja -> ["", "", ""]
i, pedig az indexe, az elöbbi tömbnek a tömbön belül 

ezután a row is csinálunk egy map-et, aminek lesz két paramétere (col, j) és ebben csináljuk meg a div-ünket

{
    table.map((row, i)=> {
        row.map((col, j)=> 
            <div className="cell">{table[i][j]}</div>
        )
    })
}

Ezt azért kell csinálnunk, mert a row az még, aminek ugyanugy külön ki kell írni az elemeit, 
ezért van a ciklusban beágyazott ciklusunk 

<div className="cell">{table[i][j]}</div>
itt kiírjuk a table-nek az i-dik és a j-dik elemét 

és még kell minegyik child-nak egy unique key property, ami a j lesz 
<div key={j} className="cell">{table[i][j]}</div>

table[i][j] ez azért kell, mert, hogy amit csináltunk táblázatot a useState-s változőval 
       ["", "", ""],
       ["", "", ""],
       ["", "", ""]

ha oda rakunk egy pl. egy x-et és egy 0-t, akkor az megjelenjen a böngészőben is
       ["x", "", ""],
       ["", "", ""],
       ["", "0", ""]
       meg is jelent, mert tudja, hogy a table-ben az x az i 0-ás és j 0-ás helyen van 
       az 0 pedig a i 2-es és  j 1-es helyen
*/