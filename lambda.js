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
        console.log(divisivelPor2, divisivelPor2(11)); // false
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

        console.log(and, display(and(F)(F))); //false
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

    //if-then-else
    // if = λp.(λa.(λb. p a b))

    ifThenElse() {
        test("Exemplo de if-then-else.")
        const T = a => b => a
        const F = a => b => b
        const and = a => b => a(b)(F)
        const or = a => b => a(T)(b)
        const not = x => x(F)(T)
        const If = Condition => Then => Else => Condition(Then)(Else)
        const display = boolean => boolean(true)(false)
        const isTrue = () => true
        const isFalse = () => false

        const First = If(T)(isTrue)(isFalse)
        const Second = If(F)(isTrue)(isFalse)
        const Result1 = If(and(T)(T))(isTrue)(isFalse)
        const Result2 = If(and(T)(F))(isTrue)(isFalse)
        const Result3 = If(or(F)(T))(isTrue)(isFalse)
        const Result4 = If(or(F)(F))(isTrue)(isFalse)
        const Result5 = If(not(or(F)(F)))(isTrue)(isFalse)

        console.log(If, First()) // true
        console.log(If, Second()) // false
        console.log(If, Result1()) // true
        console.log(If, Result2()) // false
        console.log(If, Result3()) // true
        console.log(If, Result4()) // false
        console.log(If, Result5()) // true
        console.log(If, display(If(not(or(F)(F))))) //true
        console.log(If, First.toString())
    }

    church() {
        test("Exemplos Numerais de Church")
        const T = a => b => a
        const F = a => b => b

        const zero = f => x => x
        const um = f => x => f(x)
        const dois = f => x => f(f(x))
        const tres = f => x => f(f(f(x)))
        const quatro = f => x => f(f(f(f(x))))

        const SUC = n => f => x => f(n(f)(x))
        const PRED = n => n(p => z => z(SUC(p(T)))(p(T)))(z => z(zero)(zero))(F)

        const ADD = m => n => n(SUC)(m)
        const SUB = m => n => n(PRED)(m)
        const MULT = m => n => n(ADD(m))(zero)
        const EXP = m => n => n(m)

        // Convert a concrete integer into a church numeral.
        const int2church = (i) => i === 0 ? zero : SUC(int2church(i - 1))

        // Convert a Church numeral into a concrete integer.
        const church2int = n => n(x => x + 1)(0);

        console.log(quatro              ,church2int(quatro               ))  // 4
        console.log(SUC(tres)           ,church2int(SUC(tres)            ))  // 4
        console.log(PRED(quatro)        ,church2int(PRED(quatro)         ))  // 3
        console.log(MULT(dois)(quatro)  ,church2int(MULT(dois)(quatro)   ))  // 8
        console.log(SUB(um)(dois)       ,church2int(SUB(um)(dois)        ))  // 0
        console.log(EXP(tres)(dois)     ,church2int(EXP(tres)(dois)      ))  // 9
        console.log(int2church(5)       ,church2int(int2church(5)        ))  // 5
    }
}

module.exports = new LambdaTest();