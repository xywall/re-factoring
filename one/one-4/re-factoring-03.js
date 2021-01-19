/**
 * 3차 리팩터링 : 불필요한 변수 제거하기 
 * == ( 임시 변수를 질의 함수로 바꾸기 ( *더 보기 : 7-4절) )
 * 
 *  변수 play의 경우 개별공연변수(aPerformance)에서 얻기 때문에 
 *   애초에 매개변수로 전달받을 필요가 없다.
 * 
 */

const plays = {
  "hamlet":{"name":"Hamlet","type":"tregedy"},
  "as-like":{"name":"As You Like It","type":"comedy"},
  "othello":{"name":"Othello","type":"tragedy"}
}


//대입문(=)의 우변을 변수로 담지 말고, 함수로 추출 
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
  

// 1. 우변을 함수 playFor() 로 추출 ----  ----  >>> 컴파일-테스트-커밋
// 2. 변수 인라인 , play -> playFor(perf) ----  >>> 컴파일-테스트-커밋
// 3. 인라인 된 변수는 제거 ----  ----  ----     >>> 컴파일-테스트-커밋 
// 4. 임시변수가 남아있다면, 해당 변수를 마저 인라인 시키기 >>> 컴파일-테스트-커밋
function statement(invoice, plays){ 
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `청구내역 (고객명 : ${invoice.customer})\n`;

    const format = new Intl.NumberFormat("en-US", 
                            { style: "currency", currency: "USD", 
                            minimumFractionDigits: 2 }).format;
    for (let perf of invoice.performances){
    //   const play = playFor(perf) // 1. 3.

    //   let thisAmount = amountFor(perf); // 4. 
      

      volumeCredits += Math.max(perf.audience - 30, 0);
                    // 2.
      if("comedy" === playFor(perf).type) volumeCredits += Math.floor(perf.audience/5);
                    // 2.
      result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
      totalAmount += amountFor(perf);
    }             
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;
  
  console.log('result 입니다. >>>>'); console.log(result); console.log('==== statement함수 끝 ====');
  return result;
}



// 1. playFor() 사용하도록 수정( 변수사용 -> 함수호출 ) ---- >>> 컴파일-테스트-커밋
// 2. 필요없어진 매개변수 제거   ----  ----  ----  ----     >>> 컴파일-테스트-커밋
function amountFor(aPerformance) {
  let result = 0;                         
  
  // 한번의 공연에 대한 요금을 계산
    switch (playFor(aPerformance).type){  // 
      case "tregedy": // 비극
        result = 40000;
        if (aPerformance.audience > 30){
          result += 1000 * (aPerformance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (aPerformance.audience > 20){
          result += 10000+500 * (aPerformance.audience-20);
        }
        result += 300 * aPerformance.audience;
        break;
      default:
          throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`); // play -> playFor()
    }
    return result; 
}
  
  
  
  
  
  