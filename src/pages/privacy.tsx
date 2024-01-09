import {Link} from "@chakra-ui/react";

export default function privacy() {
  return (
    <>
      <p>
        当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を使用しています。
      </p>
      <p>
        このGoogleアナリティクスはデータの収集のためにCookieを使用しています。このデータは匿名で収集されており、個人を特定するものではありません。
      </p>
      <p>
        この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
      </p>
      <p>
        この規約に関しての詳細は
        <Link href="https://marketingplatform.google.com/about/analytics/terms/jp/">
          Googleアナリティクスサービス利用規約のページ
        </Link>
        や
        <Link href="https://policies.google.com/technologies/ads?hl=ja">
          Googleポリシーと規約ページをご覧ください。
        </Link>
      </p>
    </>
  )
}