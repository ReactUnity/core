using System.Xml;
using ReactUnity.Helpers;

namespace ReactUnity.Html
{
    public class HtmlParser
    {
        public HtmlContext Context { get; }

        public HtmlParser(HtmlContext context)
        {
            Context = context;
        }

        public void Parse(string html, IContainerComponent root)
        {
            var doc = new XmlDocument();
            doc.LoadXml("<root />");
            doc.DocumentElement.InnerXml = html;

            foreach (XmlNode node in doc.DocumentElement)
                Process(node, root);
        }

        private void Process(XmlNode node, IContainerComponent parentElement)
        {
            IReactComponent nodeElement = null;

            var isTextElement = ReactUnityBridge.TextTypes.Contains(node.Name) || node.Name == "html";

            if (node.NodeType == XmlNodeType.Element || node.NodeType == XmlNodeType.Text)
            {
                nodeElement = node.NodeType == XmlNodeType.Text ?
                    Context.Context.CreateText("_text", node.InnerText) :
                    Context.Context.CreateComponent(node.Name, isTextElement ? node.InnerText : "");

                if (node.Attributes != null)
                {
                    foreach (XmlAttribute attr in node.Attributes)
                    {
                        if (attr.Name.FastStartsWith("on"))
                            nodeElement.SetEventListener(attr.Name, Callback.From(attr.Value, nodeElement.Context, nodeElement));
                        else if (attr.Name.FastStartsWith("data-"))
                            nodeElement.SetData(attr.Name.Substring(5), attr.Value);
                        else nodeElement.SetProperty(attr.Name, attr.Value);
                    }
                }

                nodeElement.SetParent(parentElement);
            }
            else if (node.NodeType == XmlNodeType.Document)
            {
                nodeElement = parentElement;
            }


            if (!isTextElement && (node.NodeType == XmlNodeType.Document || node.NodeType == XmlNodeType.Element))
            {
                if (nodeElement is IContainerComponent container)
                {
                    foreach (XmlNode child in node)
                    {
                        Process(child, container);
                    }
                }
            }
        }
    }
}
