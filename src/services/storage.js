import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@deck_connect_extensions';

export const getExtensions = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    console.error('Error fetching extensions', e);
    return [];
  }
};

export const saveExtension = async (extension) => {
  try {
    const extensions = await getExtensions();
    const newExtensions = [...extensions, { ...extension, id: Date.now().toString() }];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExtensions));
    return newExtensions;
  } catch (e) {
    console.error('Error saving extension', e);
  }
};

export const updateExtension = async (updatedItem) => {
  try {
    const extensions = await getExtensions();
    const newExtensions = extensions.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExtensions));
    return newExtensions;
  } catch (e) {
    console.error('Error updating extension', e);
  }
};

export const deleteExtension = async (id) => {
  try {
    const extensions = await getExtensions();
    const newExtensions = extensions.filter((item) => item.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newExtensions));
    return newExtensions;
  } catch (e) {
    console.error('Error deleting extension', e);
  }
};
