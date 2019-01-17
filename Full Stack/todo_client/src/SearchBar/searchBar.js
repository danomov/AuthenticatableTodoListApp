import React from 'react';


class SearchBar extends React.PureComponent {
    constructor(props){
        super(props)
        this.state = {
            data: '',
            filteredData: '',
        }
    }

    componentDidMount(){
        this.setState({data: this.props.data,filteredData: this.props.data})
    }

    onChange = (e) => {
        let newData = this.state.data.filter(element => {
            if(element[0].includes(e.target.value)){
                return element;
            }
        });

        this.setState({filteredData: newData});
    }


    render(){
        return (
            <React.Fragment>
            <input onChange={this.onChange} type='search' placeholder='Search'></input>
            <button onClick={(e) => this.props.onClick(e, this.state.filteredData)}>Search</button>
            </React.Fragment>
        )
    }
}

export default SearchBar;