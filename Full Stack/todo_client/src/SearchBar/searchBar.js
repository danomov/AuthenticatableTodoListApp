import React from 'react';


class SearchBar extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            filteredData: '',
        }
    }

    onChange = (e) => {
        let newData = this.props.data.filter(element => {
            if(element[0].includes(e.target.value)){
                return element;
            }
        });

        this.setState({filteredData: newData});
    }

    componentDidUpdate(prevProps) {
        if (this.props.data !== prevProps.data) {
            this.setState({filteredData: this.props.data});
        }
    }

    render(){
        return (
            <React.Fragment>
            <input onChange={this.onChange} type='search' placeholder='Search text'></input>
            <button onClick={(e) => this.props.onClick(e, this.state.filteredData)}>Search</button>
            </React.Fragment>
        )
    }
}

export default SearchBar;