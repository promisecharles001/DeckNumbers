import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useAuth } from '../services/AuthContext';
import { COLORS } from '../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { saveExtension, updateExtension } from '../services/storage';

const EditExtensionScreen = ({ navigation, route }) => {
    const existingExtension = route.params?.extension;
    const isEditing = !!existingExtension;
    const { setExtensions } = useAuth();

    const [name, setName] = useState(existingExtension?.name || '');
    const [extension, setExtension] = useState(existingExtension?.extension || '');
    const [category, setCategory] = useState(existingExtension?.category || 'General');

    const handleSave = async () => {
        if (!name || !extension) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        let updatedExtensions;
        if (isEditing) {
            updatedExtensions = await updateExtension({
                ...existingExtension,
                name,
                extension,
                category
            });
        } else {
            updatedExtensions = await saveExtension({
                name,
                extension,
                category
            });
        }

        setExtensions(updatedExtensions);
        navigation.goBack();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                    <Ionicons name="close-outline" size={28} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.title}>{isEditing ? 'Edit Extension' : 'New Extension'}</Text>
                <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.form}>
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>DISPLAY NAME</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. IT Department"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>EXTENSION NUMBER</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. 5001"
                        value={extension}
                        onChangeText={setExtension}
                        keyboardType="numeric"
                        placeholderTextColor={COLORS.textSecondary}
                    />
                </View>

                <View style={styles.inputGroup}>
                    <Text style={styles.label}>CATEGORY</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g. Office, General, Kitchen"
                        value={category}
                        onChangeText={setCategory}
                        placeholderTextColor={COLORS.textSecondary}
                    />
                </View>

                <View style={styles.tipsContainer}>
                    <Ionicons name="information-circle-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.tipsText}>
                        This extension will be instantly visible to all users once saved.
                    </Text>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.surface,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 60,
        paddingBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.text,
    },
    backButton: {
        padding: 5,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    saveButtonText: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    form: {
        padding: 20,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 12,
        fontWeight: 'bold',
        color: COLORS.textSecondary,
        marginBottom: 8,
        letterSpacing: 1,
    },
    input: {
        fontSize: 16,
        color: COLORS.text,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        paddingVertical: 10,
    },
    tipsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primary + '10',
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    tipsText: {
        flex: 1,
        marginLeft: 10,
        color: COLORS.primary,
        fontSize: 14,
        lineHeight: 20,
    },
});

export default EditExtensionScreen;
