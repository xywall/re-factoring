// 리팩터링 전 

function statement(invoice, plays){
  console.log(`[ function statement ] ${invoice.performances}`)

  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구내역 (고객명 : ${invoice.customer})\n`;
  
  /* Intl.NumberFormat : 언어에 맞는 숫자 서식을 지원하는 객체의 생성자 */
  const format = new Intl.NumberFormat("en-US", 
                            { style: "currency", currency: "USD", 
                            minimumFractionDigits: 2 }).format;
  for (let perf of invoice.performances){
    const play = plays[perf.playID];
    console.log('play입니다.')
    console.log(play.type)
    let thisAmount = 0;

    // 한번의 공연에 대한 요금을 계산
    switch (play.type){
      case "tregedy":
        thisAmount = 40000;
        if (perf.audience > 30){
          thisAmount += 1000 * (perf.audience - 30);
        }
        break;
      case "comedy": 
        thisAmount = 30000;
        if (perf.audience > 20){
          thisAmount+=10000+500*(perf.audience-20);
        }
        thisAmount += 300 * perf.audience;
        break;
      default:
          throw new Error(`알 수 없는 장르 : ${play.type}`);
    }

    //포인트를 적립한다.
    volumeCredits += Math.max(perf.audience - 30, 0);
    //희극 관객 5명 마다 추가 포인트를 제공한다.
    if("comedy" === play.type) volumeCredits += Math.floor(perf.audience/5);

    //청구 내역을 출력한다.
    result += ` ${play.name}: ${format(thisAmount/100)} (${perf.audience}석)\n`;
    totalAmount += thisAmount;
  }             
  result += `총액: ${format(totalAmount/100)}\n`;
  result += `적립 포인트: ${volumeCredits}점\n`;

  console.log(`[ return ] result : \n>>>>\n${result} \n // statement() END ` );

  return result;
}
