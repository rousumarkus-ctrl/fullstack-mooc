const { DataTypes } = require('sequelize');

module.exports = {
  up: async ({ context: queryInterface }) => {
    const current = new Date().getFullYear();
    await queryInterface.addColumn('blogs', 'year', {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1991,
        max: current,
      },
    });
  },
  down: async ({ context: queryInterface }) => {
    await queryInterface.removeColumn('blogs', 'year');
  },
};
