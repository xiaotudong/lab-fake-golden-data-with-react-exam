const App = React.createClass({
    getInitialState: function () {
        return {
            elements: []
        }
    },
    addElement: function (element) {
        const elements = this.state.elements;
        elements.push(element);
        console.log(elements);
        this.setState({elements});
    },
    deleteElement: function (index) {
        const elements = this.state.elements;
        elements.splice(index, 1);
        this.setState({elements});
    },
    render: function () {
        return <div>
            <ReactRouter.Link to="/preview">
                preview
            </ReactRouter.Link>
            {this.props.children && React.cloneElement(this.props.children, {
                    elements: this.state.elements,
                    onAdd: this.addElement,
                    onDelete: this.deleteElement
                })
            }
        </div>
    }
});
const Editor = React.createClass({
    render: function () {
        return <div>
            <div id="display">
                < Right elements={this.props.elements} onDelete={this.props.onDelete}/>
            </div>
            <div id="select">
                < Left onAdd={this.props.onAdd}/>
            </div>
        </div>
    }
});
const Left = React.createClass({
    add: function () {
        const element = $("input[name=element]:checked").val();
        this.props.onAdd(element);
    },
    render: function () {
        return <div>
            <input type="radio" name="element" value="text"/>text
            <br />
            <input type="radio" name="element" value="date"/>date
            <br />
            <button className="btn btn-primary" onClick={this.add}>+</button>
        </div>
    }
});

const Right = React.createClass({
    remove: function (index) {
        this.props.onDelete(index);
    },
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
                <button type="button" className="btn btn-danger btn-sm"
                        onClick={this.remove.bind(this.index)}>x
                </button>
            </div>

        })
        return <div>
            {elements}
        </div>
    }
});
const Previewer = React.createClass({
    render: function () {
        const elements = this.props.elements.map((ele, index) => {
            return <div key={index}>
                <input type={ele}/>
            </div>

        })
        return <div className="row">
            <ReactRouter.Link to="/Edit">
                Edit
            </ReactRouter.Link>
            <div id="preview">
                <div className="container">
                    {elements}
                </div>
                <button className="btn btn-primary">submit</button>
            </div>
        </div>

    }
});
ReactDOM.render(<ReactRouter.Router>
        <ReactRouter.Route path="/" component={App}>
            <ReactRouter.IndexRoute component={Editor}/>
            <ReactRouter.Route path="Preview" component={Previewer}/>
            <ReactRouter.Route path="Edit" component={Editor}/>
        </ReactRouter.Route>
    </ReactRouter.Router>
    , document.getElementById('content'));