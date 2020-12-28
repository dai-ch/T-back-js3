'use strict'

//各要素を取得
const textNode = document.getElementById('text');
const btn = document.getElementById('btn');
const table = document.getElementById('table');
const formNode = document.getElementById('form');
//カウント用の変数を宣言
let count = 0

//ボタンを押したときにイベントを発動
btn.addEventListener('click', function (e) {
  //ページ遷移を注視するためのイベント
  e.preventDefault();

  //Nodeからテキストの値を取得
  const text = textNode.value;
  //formタグからラジオボタンの要素を取得(後ほどの課題で使用可能性有)
  //const formRadioNode = formNode.check;

  //値が入ってるかどうか
  if (text) {
    count++;

    //trタグとtdタグをそれぞれ作成
    const tr = document.createElement('tr');
    const tdID = document.createElement('td');
    const tdComment = document.createElement('td');
    const tdBtnWorks = document.createElement('td');
    const tdBtnDelete = document.createElement('td');

    //ボタン用のテキストを作成
    const status1 = '作業中';
    const status2 = '削除';

    //各タグに必要なテキストまたはクラス名を追加
    tdID.textContent = count;
    tdComment.textContent = text;
    tdBtnWorks.textContent = status1;
    tdBtnDelete.textContent = status2;
    tdBtnWorks.classList.add('btn');
    tdBtnDelete.classList.add('btn');

    //trの各子要素を追加する関数
    function addTd(td) {
      tr.appendChild(td);
    }

    addTd(tdID);
    addTd(tdComment);
    addTd(tdBtnWorks);
    addTd(tdBtnDelete);

    //tableタグ内,trの末尾に宣言したtr要素を追加
    table.insertBefore(tr, null);

    //フォームに入力した内容をリセット
    formNode.reset();

  }
})

