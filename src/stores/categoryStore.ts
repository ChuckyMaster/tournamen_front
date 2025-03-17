import { defineStore } from 'pinia';
import axios from 'axios';

interface CategoryState {
  categories: Array<any>;
}

export const useCategoryStore = defineStore('category', {
  state: (): CategoryState => ({
    categories: [],
  }),

  actions: {
    // ✅ Récupérer toutes les catégories
    async fetchCategories(): Promise<void> {
      try {
        const response = await axios.get('http://localhost:8080/api/categories');
        this.categories = response.data;
        console.log('✅ Catégories récupérées:', this.categories);
      } catch (error) {
        console.error('❌ Erreur lors de la récupération des catégories', error);
      }
    },

    // ✅ Ajouter une catégorie
    async createCategory(categoryData: any): Promise<void> {
      try {
        const response = await axios.post('http://localhost:8080/api/categories', categoryData);
        this.categories.push(response.data);
        console.log('✅ Catégorie créée:', response.data);S
      } catch (error) {
        console.error('❌ Erreur lors de la création de la catégorie', error);
      }
    },

    // ✅ Mettre à jour une catégorie
    async updateCategory(id: number, categoryData: any): Promise<void> {
      try {
        const response = await axios.put(`http://localhost:8080/api/categories/${id}`, categoryData);

        // Mettre à jour la catégorie dans la liste
        const index = this.categories.findIndex(c => c.id === id);
        if (index !== -1) {
          this.categories[index] = response.data;
        }
        console.log('✅ Catégorie mise à jour:', response.data);
      } catch (error) {
        console.error('❌ Erreur lors de la mise à jour de la catégorie', error);
      }
    },

    // ✅ Supprimer une catégorie
    async deleteCategory(id: number): Promise<void> {
      try {
        await axios.delete(`http://localhost:8080/api/categories/${id}`);
        this.categories = this.categories.filter(category => category.id !== id);
        console.log('✅ Catégorie supprimée');
      } catch (error) {
        console.error('❌ Erreur lors de la suppression de la catégorie', error);
      }
    },
  },
});
