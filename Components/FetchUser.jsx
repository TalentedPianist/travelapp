import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FetchUser() {
    const [user, setUser] = useState(null);
    
    useEffect(() => { 
        const fetchUser = async () => { 
            try { 
                const storedUser = await AsyncStorage.getItem('user');
                if (storedUser ){ 
                    setUser(JSON.parse(storedUser));
                } 
            } catch (error) { 
                console.error('Error fetching user:', error);
            }
        };
    }, []);
}