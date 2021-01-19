/**
 * 
 * 1차 리팩터링 : 함수 쪼개기
 * 2차 리팩터링 : 변수를 보다 명확한 이름으로 변경해주기 ( 접두어로 타입을 알아볼 수 있게 )
 * 3차 리팩터링 : 불필요한 변수 제거하기 ( 지역변수, 임시변수 )
 * 
 * 4차 리팩터링 : 불필요한 변수 제거하기 2 ( 반복문으로 인해 계속 변화되는 변수 )
 * 5차 리팩터링 : 변수를 보다 명확한 이름으로 변경해주기
 * 
 * 6차 리팩터링 : 임시 변수 format 제거하기 format -> formatFor(aNumber)
 * 7차 리팩터링 : 함수명 보다 직관적으로 바꾸기 formatFor(aNumber) -> formatUSD
 *             + 단위 변환 로직을 format() 함수 안으로 이동
 * 
 * 8차 리팩터링 : volumeCredits 변수 제거하기
 * 
 */






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



/**
 * 호출하는 함수 : statement(invoice, plays)
 * 함수 역할 : Json데이터 가져오기
 * @param aPerformance 
 */
function playFor(aPerformance) {
  return plays[aPerformance.playID];
}
    

/**
 * 호출하는 함수 : statement(invoice, plays)
 * 함수 역할 : 포인트 적립
 * 
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
 * 호출하는 함수 : statement(invoice, plays)
 * 함수 역할 : 화폐 단위 맞추기
 * 
 * @param {*} aNumber 
 */
function formatUSD(aNumber){
  return new Intl.NumberFormat
          ("en-US", 
            { style:    "currency", 
              currency: "USD", 
              minimumFractionDigits: 2 }
          ).format(aNumber/100); //  ---- 단위 변환 로직을 format() 함수 안으로 이동
}

/* 각 단계마다 컴파일-테스트-커밋은 필수 ! */
// 01. 반복문 쪼개기
// 02. 문장 슬라이드 하기 ( 변수 선언 을 반복문 바로 앞으로 하기 )
// 03. 임시변수를 함수로 추출하기 
// 04. 변수 인라인


function totalVolumeCredits(){    // 03.
  let volumeCredits = 0; 
  for (let perf of invoice.performances){ 
    volumeCredits += volumeCreditsFor(perf);  
  }
  return volumeCredits;
}

// 최상위 함수
function statement(invoice, plays){ 
  let totalAmount = 0;
  // let volumeCredits = 0;
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;

            
  // let volumeCredits = 0; // 02.
  // for (let perf of invoice.performances){     // 01.
  //   volumeCredits += volumeCreditsFor(perf);  
  // }
  let volumeCredits = totalVolumeCredits();    // 03.


  for (let perf of invoice.performances){     // 01.
    // 청구 내역을 출력한다.
    result += ` ${playFor(perf).name}: ${formatUSD(amountFor(perf))} (${perf.audience}석)\n`;
    totalAmount += amountFor(perf);
  }   

  result += `총액: ${formatUSD(totalAmount)}\n`; // 04.
  result += `적립 포인트: ${volumeCredits}점\n`;    // 04.
    
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
    
    
    
    
    
    