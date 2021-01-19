/**
 * 1차~9차 리팩터링 결과
 * 
 */


// 최상위 함수
/**
 * 함수 역할 : 청구 내역을 출력한다.
 * @param {*} invoice 
 * @param {*} plays 
 */
function statement(invoice, plays){ 
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;
  for (let perf of invoice.performances){  
    result += ` ${playFor(perf).name}: ${formatUSD(amountFor(perf))} (${perf.audience}석)\n`;
  }   

  result += `총액: ${formatUSD(totalAmount())}\n`;
  result += `적립 포인트: ${totalVolumeCredits()}점\n`;
    
  console.log(result);
  return result;

  /**
   * 함수 역할 : 공연에 대한 total 요금 합
   */
  function totalAmount(){  
    let result = 0; 
    for (let perf of invoice.performances){     
      result += amountFor(perf);
    }   
    return result; 
  }


  // 여기서부터 중첩함수 시작
  /**
   * 함수 역할 : 값 계산
   */
  function totalVolumeCredits(){ 
    let result = 0; 
    for (let perf of invoice.performances){ 
      result += volumeCreditsFor(perf);  
    }
    return result;
  }


  /**
   * 함수 역할 : 화폐 단위 맞추기
   * @param {*} aNumber 
   */
  function formatUSD(aNumber){
    return new Intl.NumberFormat
          ("en-US", 
            { style:    "currency", 
              currency: "USD", 
              minimumFractionDigits: 2 }
          ).format(aNumber/100);
  }

  /**
   * 함수 역할 : 포인트 적립
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

  /**
   * 함수 역할 : Json데이터 가져오기
   * @param aPerformance 
   */
  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }


  /**
   * 함수 역할 : 한번의 공연에 대한 요금을 계산
   * @param {*} aPerformance 
   */
  function amountFor(aPerformance) {
    let result = 0;                         
 
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
  } // amountFor() END 
} // statement() END


const plays =
 {
    "hamlet":{"name":"Hamlet","type":"tregedy"},
    "as-like":{"name":"As You Like It","type":"comedy"},
    "othello":{"name":"Othello","type":"tragedy"}
 }

const invoice =     {
  "customer":"BigCo",
  "performances":[
      {
          "playID":"hamlet",
          "audience":55
      },
      {
          "playID":"as-like",
          "audience":35
      }
  ]
}
