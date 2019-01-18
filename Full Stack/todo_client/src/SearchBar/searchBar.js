import React from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import green from '@material-ui/core/colors/green';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
      primary: green,
    },
    typography: {
      useNextVariants: true,
    },
  });


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
            return null;
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
            <Input onChange={this.onChange} type='search' placeholder='Search text'></Input>
            <MuiThemeProvider theme={theme}>
            <Button variant="contained" size="small" color="primary" onClick={(e) => this.props.onClick(e, this.state.filteredData)}>Search</Button>
            </MuiThemeProvider>
            </React.Fragment>
        )
    }
}

export default SearchBar;