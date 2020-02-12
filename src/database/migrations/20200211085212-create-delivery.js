module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      signature_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'files',
          },
          key: 'id',
        },
        allowNull: true,
      },
      recipient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'recipients',
          },
          key: 'id',
        },
        allowNull: true,
      },
      courier_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'couriers',
          },
          key: 'id',
        },
        allowNull: true,
      },
      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveries');
  },
};
