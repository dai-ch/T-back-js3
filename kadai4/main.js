'use strict'

//各要素を取得
const inputText = document.getElementById('text');
const addBtn = document.getElementById('btn');
const table = document.getElementById('table');
const tableBody = document.getElementById('tableBody');
const formNode = document.getElementById('form');
const allSelectBtn = document.getElementById('allSelect');
const worksSelectBtn = document.getElementById('worksSelect');
const finishSelectBtn = document.getElementById('finishSelect');

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
const showText = function (texts) {
  //(2回目以降の追加ボタン押下時に作動)HTMLに表示されているリストを全て削除する
  while (tableBody.firstChild) {
    tableBody.removeChild(tableBody.firstChild);
  }
  //配列から要素数分取得
  texts.forEach(function (todo, index) {
    //trタグとtdタグをそれぞれ作成
    const tr = document.createElement('tr');
    const tdId = document.createElement('td');
    const tdComment = document.createElement('td');

    //各タグに必要なテキストまたはクラス名を追加
    tdId.textContent = todo.id;
    tdComment.textContent = todo.comment;

    //trの各子要素を追加する関数
    tr.appendChild(tdId);
    tr.appendChild(tdComment);
    tr.appendChild(statusBtn(todo));
    tr.appendChild(deleteBtn(todo));
    //tableタグ内,trの末尾に宣言したtr要素を追加
    tableBody.insertBefore(tr, null);
  });
}

//削除ボタンを作成＋表示する関数
const deleteBtn = function (todo) {

  const tdBtnDelete = document.createElement('td');
  tdBtnDelete.textContent = '削除';
  tdBtnDelete.classList.add('btn');
  tdBtnDelete.setAttribute('id', 'deleteBtn');
  //削除ボタンを押した時の処理
  tdBtnDelete.addEventListener('click', function () {

    //削除するID番号を取得
    const deleteId = todo.id;
    //クリックされたボタンに対応するNodeListのプロパティを削除
    todoList.splice(deleteId, 1);
    //todoの各IDを再度連番になりように振り直す
    for (let i = 0; i < todoList.length; i++) {
      todoList[i]['id'] = i;
    }
    //作業状況を管理する関数(ラジオボタン)
    radio();
  })
  return tdBtnDelete;
}

//状態を表示するボタンを作成＋表示,管理する
const statusBtn = function (todo) {
  const statusBtn = document.createElement('td');
  statusBtn.textContent = todo.status;
  statusBtn.classList.add('btn');

  //作業中・完了ボタンを押した時の処理
  statusBtn.addEventListener('click', function () {
    if (todo.status === '作業中') {
      todo.status = '完了';
      radio();
    } else if (todo.status === '完了') {
      todo.status = '作業中';
      radio();
    }
  })
  return statusBtn;
}

//作業状況を管理する関数を作成
const radio = function () {
  //選択したラジオボタンの値を取得
  if (allSelectBtn.checked) {
    showText(todoList);
  } else if (worksSelectBtn.checked) {
    //条件に合う要素の配列を取得する
    let todoStatus = todoList.filter(todo => {
      return todo.status === '作業中'
    })
    return showText(todoStatus);
  } else if (finishSelectBtn.checked) {
    let todoStatus = todoList.filter(todo => {
      return todo.status === '完了';
    })
    return showText(todoStatus);
  }
}