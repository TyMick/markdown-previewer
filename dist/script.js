// Open links in output in new tab
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" rel="noopener" href="${href}">${text}</a>`;
};

// Allow line breaks with carriage return
marked.setOptions({
  breaks: true });


// App in a single component
class MarkdownPreviewer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown:
      "# Heading\r" +
      "## Sub-heading\r" +
      "[link](http://example.com) `inline code` **bolded text**\r" +
      "```\r" +
      "code\r" +
      "block\r" +
      "```\r" +
      "- list item\r\r" +
      "> blockquote\r\r" +
      "![Dummy image](https://dummyimage.com/100)" };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      markdown: e.target.value });

  }

  render() {
    return (
      React.createElement("div", { className: "container" },
      React.createElement("div", { className: "form-group" },
      React.createElement("label", { for: "editor" }, "Markdown input"),
      React.createElement("textarea", {
        id: "editor",
        className: "form-control",
        rows: "5",
        type: "text",
        value: this.state.markdown,
        onChange: this.handleChange })),



      React.createElement("div", { className: "form-group" },
      React.createElement("label", { for: "preview" }, "Rendered output"),
      React.createElement("div", {
        id: "preview",
        className: "card p-3",
        dangerouslySetInnerHTML: {
          __html: marked(this.state.markdown, { renderer: renderer }) } }))));





  }}


// Render to DOM
ReactDOM.render(React.createElement(MarkdownPreviewer, null), document.getElementById("root"));