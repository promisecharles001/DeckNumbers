import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';

const DirectoryScreen = ({ navigation }) => {
    const { extensions, isAdmin } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    const filteredExtensions = extensions.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.extension.includes(searchQuery)
    );

    const renderItem = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardInfo}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.category}>{item.category}</Text>
            </View>
            <TouchableOpacity
                style={styles.extensionContainer}
                onPress={() => {/* In a real app, this might trigger a dialer */ }}
            >
                <Text style={styles.extensionText}>{item.extension}</Text>
                <Ionicons name="call-outline" size={20} color={COLORS.primary} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>DeckConnect</Text>
                <TouchableOpacity onPress={() => navigation.navigate(isAdmin ? 'AdminDashboard' : 'AdminLogin')}>
                    <Ionicons
                        name={isAdmin ? "settings-outline" : "lock-closed-outline"}
                        size={24}
                        color={COLORS.primary}
                    />
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <Ionicons name="search-outline" size={20} color={COLORS.textSecondary} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search name or extension..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={COLORS.textSecondary}
                />
            </View>

            <FlatList
                data={filteredExtensions}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listContent}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No results found</Text>
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
        fontSize: 28,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        margin: 20,
        paddingHorizontal: 15,
        borderRadius: 12,
        height: 50,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
    },
    listContent: {
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 15,
        padding: 20,
        marginBottom: 15,
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
        fontSize: 18,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 4,
    },
    category: {
        fontSize: 14,
        color: COLORS.textSecondary,
    },
    extensionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 10,
    },
    extensionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.primary,
        marginRight: 8,
    },
    emptyText: {
        textAlign: 'center',
        marginTop: 50,
        color: COLORS.textSecondary,
        fontSize: 16,
    },
});

export default DirectoryScreen;
