namespace Domain.Services
{
    /// <summary>
    /// CRUD interface, where the persistence (DB) operations are
    /// abstracted to the Interface layer.
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public interface IRepository<TEntity> : IDisposable where TEntity : Domain.Entity
    {
        public int Insert(TEntity entity);
        public bool Update(TEntity entity);
        public bool Upsert(TEntity entity);
        public bool Delete(int id);
        public bool DeleteAll();
        public TEntity GetById(int id);
        public IEnumerable<TEntity> GetAll();

    }
}
