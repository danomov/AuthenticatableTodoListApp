import React from 'react'
import ErrorPage from '../ErrorPage/errorPage';

class RouteErrorBoundary extends React.Component {
constructor(props){
    super(props)
    this.state = {
        hasErrors: false,
        error: '',
    }
}


static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
}

render(){
    if(this.state.hasErrors)
    return (
        <ErrorPage err={this.state.error}/>
    )

    return this.props.children;
}


}

export default RouteErrorBoundary;