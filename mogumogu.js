window.onload = function() {

    //グローバル変数
    var count = 10; //プレイ時間
    var total = 0; //点数
    var ids = ['b1','b2','b3','b4','b5','b6','b7','b8','b9'];　//9個のマスのID
    
    //モグラを出す処理
	moguraDasu();//初回のみ
    var tiID = setInterval(moguraDasu, 300);//そのあとも0.3秒ごとに呼ぶ

    //※制限時間現象開始（位置おかしいので修正）
    countdown(); 
			
    //各マスをたたいたときに実行するよう設定しておく
	document.getElementById('b1').addEventListener('click', tataita);
	document.getElementById('b2').addEventListener('click', tataita);
	document.getElementById('b3').addEventListener('click', tataita);
	document.getElementById('b4').addEventListener('click', tataita);
	document.getElementById('b5').addEventListener('click', tataita);
	document.getElementById('b6').addEventListener('click', tataita);
	document.getElementById('b7').addEventListener('click', tataita);
	document.getElementById('b8').addEventListener('click', tataita);
	document.getElementById('b9').addEventListener('click', tataita);

    
    /**
     * メソッド領域
     */
    //プレイ時間を減少させる（値がマイナスになるので要修正）
	function countdown(){
				document.getElementById('count').textContent=count;
				count--;
                console.log(count);
                
                //1秒ずつカウンタが減る
                var id = setTimeout(countdown, 1000);
                //カウントが0になったらカウントをストップする
                if(count < 0){　
					  clearTimeout(id);//idをclearTimeoutで指定している
                      document.getElementById('owari').textContent = "GAME OVER";
					  document.getElementById('score').textContent = "★あなたの得点は" + total + "点でした★";
					}
    }
             
	//ランダムにモグラを出す処理
	function moguraDasu()
	{
        if(count < 0){clearInterval(tiID);}
			//30%ぐらいの確率でモグラを出すことにする
			if (Math.random() < 0.3) {
				var masu = document.getElementById(ids[Math.floor(Math.random()*9)]);
				//ただしモグラを出すのはモグラがいないマス
				if (masu.innerHTML == '') {
					masu.innerHTML = '<img src="mogura.png", width = 70, height=75, id="mogu">';
					setTimeout(function(){moguraKakusu(masu);}, 1000);
				}
			}
	    
}
	//出したモグラを隠す処理
	function moguraKakusu(masu)
	{
		masu.innerHTML = '';
	}
            
    //たたいた時の処理
	function tataita(e)
	{
		if (e.target.id == 'mogu') {
			total +=10;
			document.getElementById('message').innerHTML = '○ あたり！';
			e.target.innerHTML = '';   
		} else {
				total -=10;
				document.getElementById('message').innerHTML = '× はずれ！';
		}
		if (total < 0) {
			total = 0;
		}
		if(count < 0){
			return false;
		}
		document.getElementById('point').innerHTML = 'Score：' +total;
		}
	}
