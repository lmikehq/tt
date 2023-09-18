interface Props {
  article: {
    body: string;
  };
}

const PrivacyPolicy = ({ article }: Props) => {
  return (
    <>
      <article className="prose lg:prose-xl">
        <div dangerouslySetInnerHTML={{ __html: article.body }} />
      </article>
    </>
  );
};

export default PrivacyPolicy;
