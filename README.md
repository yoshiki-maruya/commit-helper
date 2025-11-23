# commit-helper

**commit-helper** は、Git のステージされたファイルから、
**Conventional Commits** に準拠したコミットメッセージを簡単に生成するための CLI ツールです。

対話形式で commit type / scope / description を選択・入力できるため、
チーム開発や個人開発におけるコミット規則の統一に役立ちます。

---

## ✨ Features

* ステージされたファイルを自動検出して一覧表示
* コミットするかどうかの確認プロンプト
* Conventional Commit の **commit type を選択**
* scope（任意）・ description を入力してコミットメッセージを生成
* SimpleGit による Git commit 実行
* 直感的でわかりやすい対話型 UI

---

## 📦 Installation

### Global インストール

```sh
npm install -g @yoshiki-maruya/commit-helper
```

### ローカルプロジェクトに導入

```sh
npm install @yoshiki-maruya/commit-helper --save-dev
```

---

## 🚀 Usage

### グローバル

```sh
npx commit-helper
```

### npm script で使用

```json
{
  "scripts": {
    "commit": "npx commit-helper"
  }
}
```

実行：

```sh
npm run commit
```

---

## 📝 How It Works

1. ステージされたファイルを取得
2. コミット対象か確認
3. commit type を選択
4. scope（任意）・ description を入力
5. 自動的に Conventional Commits に準拠したメッセージを生成：

例：

```
feat(api): add user profile endpoint
```

6. Git commit を実行

---

## 📋 Supported Commit Types

| Type       | Explanation |
| ---------- | ----------- |
| `feat`     | 新機能         |
| `fix`      | バグ修正        |
| `docs`     | ドキュメント変更    |
| `style`    | コードスタイル修正   |
| `refactor` | リファクタリング    |
| `test`     | テスト追加・修正    |
| `chore`    | 雑務 / ビルドなど  |

---

## 🛠️ Requirements

* Node.js 16+
* Git が利用可能であること
* ステージされたファイルが存在すること

---

## 📄 Example Interaction

```
📁Staged files:
- src/index.ts
- package.json

? Do you want to commit these files? Yes
? Select commit type › feat
? Enter scope (optional): cli
? Enter commit description: add interactive commit helper

✅Commit created: "feat(cli): add interactive commit helper"
```

---

## 📜 License

ISC
