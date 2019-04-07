// λx    .  x + 1     (a)
// (head)   (body)    (outra expressao)
//         expressão

let test = (a) => {
    console.log('\n' + a);
}

class LambdaTest {

    soma() {
        test("Exemplo de Soma com lambda/currying.")
        const lambdaSoma = (x, y) => (x + y);
        const currySomaArrow = x => y => x + y;
        const currySoma = function (x) {
            return function (y) {
                return x + y;
            }
        }
        const resultado = (lambdaSoma) => lambdaSoma(1, 5);

        console.log(resultado, resultado(lambdaSoma)); //6
        console.log(lambdaSoma, lambdaSoma(1, 2)); //3
        console.log(currySoma, currySoma(1)(2)); //3
        console.log(currySomaArrow, currySomaArrow(1)(2)); //3
    }

    divisivel() {
        test("Exemplo prático do currying.")
        const divisivelPor = divisor => numero => !(numero % divisor);
        const divisivelPor2 = divisivelPor(2);
        console.log(divisivelPor, divisivelPor(2)(10)); // true
        console.log(divisivelPor, divisivelPor(3)(10)); // false
        console.log(divisivelPor2, divisivelPor2(11)); //false
    }

    booleanCurrying() {
        test("Exemplo de lambda com operações booleanas. (currying)")
        const T = a => b => a
        const F = a => b => b
        const and = a => b => a(b)(F)
        const or = a => b => a(T)(b)
        const not = x => x(F)(T)

        const display = (boolean) => boolean(true)(false);

        console.log(T, display(T)) //true
        console.log(F, display(F)) //false
        console.log(not, display(not(T))) //false

        console.log(and, display(and(T)(F))); //false
        console.log(and, display(and(T)(T))); //true
        console.log(or, display(or(T)(F))); //true
        console.log(not, display(not(or(T)(F)))); // false
        console.log(not, display(not(and(T)(or(T)(F))))); //false
    }


    boolean() {
        test("Exemplo de lambda com operações booleanas. (sem currying)")
        const T = (a, b) => a
        const F = (a, b) => b
        const and = (a, b) => a(b, F)
        const or = (a, b) => a(T, b)
        const not = x => x(F, T)

        const display = (boolean) => boolean(true, false);

        console.log(T, display(T)) //true
        console.log(F, display(F)) //false
        console.log(not, display(not(T))) //false

        console.log(and, display(and(T, F))); //false
        console.log(and, display(and(T, T))); //true
        console.log(or, display(or(T, F))); //true
        console.log(not, display(not(or(T, F)))); // false
        console.log(not, display(not(and(T, or(T, F))))); //false
    }
}

module.exports = new LambdaTest();