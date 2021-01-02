'use strict'

//各要素を取得
const inputText = document.getElementById('text');
const addBtn = document.getElementById('btn');
const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const formNode = document.getElementById('form');
const radioBtn = document.getElementsByName('check');

//Todoリストを管理する配列を宣言
const todoList = [];

//追加ボタンを押した時の処理
addBtn.addEventListener('click', function (e) {
  //ページ遷移を注視するためのイベント
  e.preventDefault();
  //入力された値が空なら処理を中断
  if (!inputText.value) {
    return;
  }
  //todoListに格納するオブジェクトの宣言（trタグ内のtdタグで表示）
  const todo = {
    id: todoList.length,
    comment: inputText.value,
    status: '作業中',
  }
  //配列の末尾にtodoを追加
  todoList.push(todo);
  //フォームに入力した内容をリセット
  formNode.reset();
  //テキストを追加・表示する関数を実行
  showText(todoList);
})

//テキストを追加・表示する関数
const showText = function (todoList) {
  //(2回目以降の追加ボタン押下時に作動)
  //HTMLに表示されているリストを全て削除する
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  //配列から要素数分取得
  todoList.forEach(function (todo, index) {
    //trタグとtdタグをそれぞれ作成
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdComment = document.createElement('td');
    const tdBtnWorks = document.createElement('td');
    //各タグに必要なテキストまたはクラス名を追加
    tdId.textContent = index;
    tdComment.textContent = todo['comment'];
    tdBtnWorks.textContent = todo['status'];
    tdBtnWorks.classList.add('btn');
    //trの各子要素を追加する関数
    tr.appendChild(tdId);
    tr.appendChild(tdComment);
    tr.appendChild(tdBtnWorks);
    //iはtodolistの配列の要素番号
    tr.appendChild(deleteBtn(index));
    //tableタグ内,trの末尾に宣言したtr要素を追加
    tableBody.insertBefore(tr, null);
  });
}

//削除ボタンを作成＋表示する関数
const deleteBtn = function (index) {
  const tdBtnDelete = document.createElement('td');
  tdBtnDelete.textContent = '削除';
  tdBtnDelete.classList.add('btn');
  tdBtnDelete.setAttribute('id', 'deleteBtn');
  //削除ボタンを押した時の処理
  tdBtnDelete.addEventListener('click', function () {
    //クリックされたボタンに対応するNodeListのプロパティを削除
    todoList.splice(index, 1);
    //todoの各IDを再度連番になりように振り直す
    for (let i = 0; i < todoList.length; i++) {
      todoList[i]['id'] = i;
    }
    //todoに格納されている値をテキストに追加＋表示
    showText(todoList);
  })
  return tdBtnDelete;
}