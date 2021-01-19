/**
 * 
 * 1차 리팩터링 : 함수 쪼개기
 * 2차 리팩터링 : 변수를 보다 명확한 이름으로 변경해주기 ( 접두어로 타입을 알아볼 수 있게 )
 * 3차 리팩터링 : 불필요한 변수 제거하기 ( 지역변수, 임시변수 )
 * 
 * 4차 리팩터링 : 불필요한 변수 제거하기 2 ( 반복문으로 인해 계속 변화되는 변수 )
 * 5차 리팩터링 : 변수를 보다 명확한 이름으로 변경해주기
 * 
 */

const plays =
 {
    "hamlet":{"name":"Hamlet","type":"tregedy"},
    "as-like":{"name":"As You Like It","type":"comedy"},
    "othello":{"name":"Othello","type":"tragedy"}
 }


/**
 * 호출하는 함수 : statement(invoice, plays)
 * @param aPerformance 
 */
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
    

// NEW! : 변수명 변경
/**
 * 호출하는 함수 : statement(invoice, plays)
 * @param perf 
 */
function volumeCreditsFor(perf) { 
  let result = 0;
  
  result += Math.max(perf.audience - 30, 0);

  if("comedy" === playFor(perf).type) {
    result += Math.floor(perf.audience/5);
  }
  return result;
}



// 최상위 함수
function statement(invoice, plays){ 
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;
  
  const format = new Intl.NumberFormat("en-US", 
                        { style: "currency", currency: "USD", 
                        minimumFractionDigits: 2 }).format;

    for (let perf of invoice.performances){
    //   // 포인트를 적립한다.
    //   volumeCredits += Math.max(perf.audience - 30, 0);
    //   // 희극 관객 5명마다 추가 포인트 제공한다.
    //   if("comedy" === playFor(perf).type) {
    //     volumeCredits += Math.floor(perf.audience/5);
    //   }
    volumeCredits += volumeCreditsFor(perf);  // ----  ----  ---- > 02. >>> 컴파일-테스트-커밋

      // 청구 내역을 출력한다.
      result += ` ${playFor(perf).name}: ${format(amountFor(perf)/100)} (${perf.audience}석)\n`;
      totalAmount += amountFor(perf);
    }             
    
    result += `총액: ${format(totalAmount/100)}\n`;
    result += `적립 포인트: ${volumeCredits}점\n`;

    console.log(result);
    return result;
  }
  
  
  
function amountFor(aPerformance) {
  let result = 0;                         
    
  // 한번의 공연에 대한 요금을 계산
  switch (playFor(aPerformance).type){  
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
      throw new Error(`알 수 없는 장르 : ${playFor(aPerformance).type}`); 
  }
  return result; 
}
    
    
    
    
    
    