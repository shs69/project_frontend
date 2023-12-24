import { useState, useEffect, useContext } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';
import styles from './Search.module.css';
import Context from '../../../../utils/context';

const UserSearchForm = () => {
    const [usernames, setUsernames] = useState([]);
    const [selectedUser, setSelectedUser] = useContext(Context);
    const [suggestions, setSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const getUsers = async (searchText) => {
        try {
            const response = await axios.get("http://localhost:8080/api/v1/search/users", {
                withCredentials: true,
                params: {
                    "search_text": searchText,
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    };

    const fetchData = async (searchText) => {
        try {
            const users = await getUsers(searchText);
            setUsernames(users);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchData("");
    }, []);

    const getSuggestions = (value) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;

        return inputLength === 0 ? [] : usernames.filter(user =>
            user.out_username.toLowerCase().includes(inputValue) && user.out_user_id !== localStorage.getItem('uid')
        );
    };

    const onSuggestionsFetchRequested = ({ value }) => {
        setSuggestions(getSuggestions(value));
    };

    const onSuggestionsClearRequested = () => {
        setSuggestions([]);
    };

    const getSuggestionValue = suggestion => suggestion.out_username;

    const renderSuggestion = suggestion => (
        <div>
            {suggestion.out_username}
        </div>
    );

    const onChange = (event, { newValue }) => {
        setInputValue(newValue);
    };

    const onSuggestionSelected = (event, { suggestion }) => {
        const userAdded = selectedUser.some(user => user.out_user_id === suggestion.out_user_id);
        if (!userAdded) {
            setSelectedUser(prevUsers => [...prevUsers, suggestion]);
        }
        setInputValue('')
    };

    const inputProps = {
        value: inputValue,
        onChange,
        className: styles.input,
    };

    return (
        <div className={styles.container}>
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={inputProps}
                onSuggestionSelected={onSuggestionSelected}
                theme={{
                    suggestionsContainer: styles.suggestionsContainer,
                    suggestionsList: styles.suggestionsList,
                    suggestion: styles.suggestion
                }}
            />
        </div>
    );
};

export default UserSearchForm;
