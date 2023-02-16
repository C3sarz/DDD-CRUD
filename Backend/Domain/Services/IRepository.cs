namespace Domain.Services
{
    /// <summary>
    /// CRUD interface, where the persistence operations are abstracted to the interface layer.
    /// </summary>
    /// <typeparam name="Entity"></typeparam>
    public interface IRepository<TEntity> : IDisposable where TEntity : Domain.Entity
    {
        public int Add(TEntity entity);
        public bool Update(TEntity entity);
        public bool Delete(int id);
        public bool DeleteAll();
        public TEntity GetById(int id);
        public IEnumerable<TEntity> GetAll();

    }
}
