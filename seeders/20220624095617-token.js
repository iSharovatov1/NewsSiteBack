module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('Tokens', [{
      token: 'xRLzqng0qrCdPcpheGk2Jxfmzy7xA7ItEsbsooUVVGWafldeLqtSGxfVcNPQ9Tg5Zhb8avO91WbV6vg7VTjXCHioTUH4jdPZF9B9Co2ZkzZSsxoSBN01XSNiRXbcTuBb5e7bbOUmHhPpJeskq49B2e4aGttEjBgkfxQFpvVqLGlqDmr0R60MFoR9jCfs8VzyFrKjoemmHmInMHbe0wWObIFJTkUNazl4H0djUuytctrEvTeSKhljQK1FyF3Nluc',
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Tokens', null, {});
  },
};
