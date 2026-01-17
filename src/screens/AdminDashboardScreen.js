import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { deleteExtension } from '../services/storage';

const AdminDashboardScreen = ({ navigation }) => {
    const { extensions, setExtensions, logout } = useAuth();

    const handleDelete = (item) => {
        Alert.alert(
            'Delete Extension',
            `Are you sure you want to delete ${item.name}?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        const updatedExtensions = await deleteExtension(item.id);
                        setExtensions(updatedExtensions);
                    }
                }
            ]
        );
    };

    const handleLogout = () => {
        logout();
        navigation.replace('Directory');
    };

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.extension}>{item.extension}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.primary + '15' }]}
                    onPress={() => navigation.navigate('EditExtension', { extension: item })}
                >
                    <Ionicons name="create-outline" size={20} color={COLORS.primary} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: COLORS.error + '15' }]}
                    onPress={() => handleDelete(item)}
                >
                    <Ionicons name="trash-outline" size={20} color={COLORS.error} />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
                    <Ionicons name="log-out-outline" size={24} color={COLORS.error} />
                </TouchableOpacity>
                <Text style={styles.title}>Admin Panel</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('EditExtension')}
                    style={styles.iconButton}
                >
                    <Ionicons name="add-circle" size={32} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <FlatList
                data={extensions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListHeaderComponent={
                    <Text style={styles.sectionTitle}>Manage Extensions ({extensions.length})</Text>
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
        backgroundColor: COLORS.surface,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    iconButton: {
        padding: 5,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginVertical: 15,
        marginLeft: 5,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 15,
        padding: 15,
        marginBottom: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
    },
    cardInfo: {
        flex: 1,
    },
    name: {
        fontSize: 17,
        fontWeight: '600',
        color: COLORS.text,
    },
    extension: {
        fontSize: 15,
        color: COLORS.primary,
        fontWeight: 'bold',
        marginTop: 2,
    },
    actions: {
        flexDirection: 'row',
    },
    actionButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },
});

export default AdminDashboardScreen;
